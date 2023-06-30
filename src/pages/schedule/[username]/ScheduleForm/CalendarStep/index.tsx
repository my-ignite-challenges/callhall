import { Calendar } from "@/components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimePickerOption,
} from "./styles";

export function CalendarStep() {
  const hasSelectedDays = true;

  return (
    <Container showTimePicker={hasSelectedDays}>
      <Calendar />

      {hasSelectedDays && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>20 de setembro</span>
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
