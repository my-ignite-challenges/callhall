import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date not provided" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const givenDate = dayjs(String(date));
  const isPastDate = givenDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({
      initialAvailableHoursList: [],
      remainingAvailableHours: [],
    });
  }

  const userScheduleAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: givenDate.get("day"),
    },
  });

  if (!userScheduleAvailability) {
    return res.json({
      initialAvailableHoursList: [],
      remainingAvailableHours: [],
    });
  }

  const { start_time_in_minutes, end_time_in_minutes } =
    userScheduleAvailability;

  const startHour = start_time_in_minutes / 60;
  const endHour = end_time_in_minutes / 60;

  const initialAvailableHoursList = Array.from({
    length: endHour - startHour,
  }).map((_, index) => startHour + index);

  const unavailableHours = await prisma.schedule.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: givenDate.set("hour", startHour).toDate(),
        lte: givenDate.set("hour", endHour).toDate(),
      },
    },
  });

  const remainingAvailableHours = initialAvailableHoursList.filter((hour) => {
    const isUnavailableForScheduling = unavailableHours.some(
      (unavailableHour) => unavailableHour.date.getHours() === hour
    );

    const isPastHour = givenDate.set("hour", hour).isBefore(new Date());

    return !isUnavailableForScheduling && !isPastHour;
  });

  return res.json({ initialAvailableHoursList, remainingAvailableHours });
}
