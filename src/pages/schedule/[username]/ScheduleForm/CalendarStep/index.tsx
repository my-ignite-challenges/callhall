import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { Calendar } from "@/components/Calendar";
import { api } from "@/lib/axios";

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimePickerOption,
} from "./styles";

type UserScheduleAvailability = {
  initialAvailableHoursList: number[];
  remainingAvailableHours: number[];
};

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const hasSelectedDate = !!selectedDate;
  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const formattedMonthAndDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const dateQueryParam = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: userScheduleAvailability } = useQuery<UserScheduleAvailability>(
    ["userScheduleAvailability", dateQueryParam],
    async () => {
      const response = await api.get(
        `/users/${username}/schedule-availability`,
        {
          params: {
            date: dateQueryParam,
          },
        }
      );

      return response.data;
    },
    {
      enabled: !!selectedDate,
    }
  );

  return (
    <Container showTimePicker={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelection={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{formattedMonthAndDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {userScheduleAvailability?.initialAvailableHoursList.map((hour) => (
              <TimePickerOption
                key={hour}
                disabled={
                  !userScheduleAvailability.remainingAvailableHours.includes(
                    hour
                  )
                }
              >
                {String(hour).padStart(2, "0")}:00h
              </TimePickerOption>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
