import { CaretLeft, CaretRight } from "phosphor-react";
import { Actions, Body, Container, Day, Header, Title } from "./styles";
import { getWeekDays } from "@/utils/getWeekDays";

export function Calendar() {
  const weekDays = getWeekDays("short");

  return (
    <Container>
      <Header>
        <Title>
          Dezembro <span>2022</span>
        </Title>
        <Actions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
