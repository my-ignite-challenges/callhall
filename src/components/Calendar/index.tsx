import { useState } from "react";

import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";

import { getWeekDays } from "@/utils/getWeekDays";

import { Actions, Body, Container, Day, Header, Title } from "./styles";

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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Day>1</Day>
            </td>
            <td>
              <Day>2</Day>
            </td>
            <td>
              <Day>3</Day>
            </td>
          </tr>
        </tbody>
      </Body>
    </Container>
  );
}
