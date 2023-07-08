import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const scheduleBody = z.object({
    name: z.string(),
    email: z.string().email(),
    remarks: z.string(),
    date: z.string().datetime(),
  });
  const { name, email, remarks, date } = scheduleBody.parse(req.body);

  const scheduleDate = dayjs(date).startOf("hour");

  const dateAndTimeAreTaken = await prisma.schedule.findFirst({
    where: {
      user_id: user.id,
      date: scheduleDate.toDate(),
    },
  });

  if (dateAndTimeAreTaken) {
    return res.status(400).json({
      message: "That date and time are already taken.",
    });
  }

  if (scheduleDate.isBefore(new Date())) {
    return res.status(400).json({
      message: "Past dates are not allowed.",
    });
  }

  await prisma.schedule.create({
    data: {
      date: scheduleDate.toDate(),
      name,
      email,
      remarks,
      user_id: user.id,
    },
  });

  return res.status(201).end();
}
