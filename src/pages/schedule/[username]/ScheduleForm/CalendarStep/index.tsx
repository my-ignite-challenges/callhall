import { useState } from "react";

import dayjs from "dayjs";

import { Calendar } from "@/components/Calendar";

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimePickerOption,
} from "./styles";

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const hasSelectedDate = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const formattedMonthAndDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  return (
    <Container showTimePicker={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelection={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{formattedMonthAndDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerOption>08:00h</TimePickerOption>
            <TimePickerOption>09:00h</TimePickerOption>
            <TimePickerOption>10:00h</TimePickerOption>
            <TimePickerOption>11:00h</TimePickerOption>
            <TimePickerOption>12:00h</TimePickerOption>
            <TimePickerOption>13:00h</TimePickerOption>
            <TimePickerOption>14:00h</TimePickerOption>
            <TimePickerOption>15:00h</TimePickerOption>
            <TimePickerOption>16:00h</TimePickerOption>
            <TimePickerOption>17:00h</TimePickerOption>
            <TimePickerOption>18:00h</TimePickerOption>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
