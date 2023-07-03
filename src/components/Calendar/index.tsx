import { useMemo, useState } from "react";

import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";

import { getWeekDays } from "@/utils/getWeekDays";

import { Actions, Body, Container, Day, Header, Title } from "./styles";

type CalendarRow = {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
};

type CalendarRows = CalendarRow[];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const weekDays = getWeekDays("short");

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  function showPreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previousMonthDate);
  }

  function showNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCurrentDate(nextMonthDate);
  }

  const calendarWeeks = useMemo(() => {
    const daysInTheCurrentMonth = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set("date", index + 1);
    });

    const firstWeekDayInTheCurrentMonth = currentDate.get("day");
    const daysBeforeTheStartOfTheCurrentMonth = Array.from({
      length: firstWeekDayInTheCurrentMonth,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, "day");
      })
      .reverse();

    const lastDayInTheCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    );

    const lastWeekDayInTheCurrentMonth = lastDayInTheCurrentMonth.get("day");

    const daysAfterTheEndOfTheCurrentMonth = Array.from({
      length: 7 - (lastWeekDayInTheCurrentMonth + 1),
      // 7 refers to seven days in a week.
    }).map((_, index) => lastDayInTheCurrentMonth.add(index + 1, "day"));

    const calendarDisplayableDays = [
      ...daysBeforeTheStartOfTheCurrentMonth.map((date) => ({
        date,
        disabled: true,
      })),
      ...daysInTheCurrentMonth.map((date) => ({
        date,
        disabled: false,
      })),
      ...daysAfterTheEndOfTheCurrentMonth.map((date) => ({
        date,
        disabled: true,
      })),
    ];

    const calendarRows = calendarDisplayableDays.reduce<CalendarRows>(
      (weeks, _, index, originalRows) => {
        const isFullWeek = index % 7 === 0;

        if (isFullWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: originalRows.slice(index, index + 7),
          });
        }

        return weeks;
      },
      []
    );

    return calendarRows;
  }, [currentDate]);

  return (
    <Container>
      <Header>
        <Title>
          {currentMonth} <span>{currentYear}</span>
        </Title>
        <Actions>
          <button onClick={showPreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={showNextMonth} title="Next month">
            <CaretRight />
          </button>
        </Actions>
      </Header>

      <Body>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <Day disabled={disabled}>{date.get("date")}</Day>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Body>
    </Container>
  );
}
