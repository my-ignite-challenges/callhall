import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";

import { Container, Header } from "../styles";
import {
  Day,
  InputsWrapper,
  Interval,
  IntervalBox,
  IntervalsWrapper,
} from "./styles";
import { ArrowRight } from "phosphor-react";

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>
          Defina o intervalo de horários em que você está disponível em cada dia
          da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalsWrapper>
          <Interval>
            <Day>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </Day>
            <InputsWrapper>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </InputsWrapper>
          </Interval>

          <Interval>
            <Day>
              <Checkbox />
              <Text>Terça-feira</Text>
            </Day>
            <InputsWrapper>
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </InputsWrapper>
          </Interval>
        </IntervalsWrapper>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
