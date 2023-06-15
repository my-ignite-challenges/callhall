import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { getWeekDays } from "@/utils/getWeekDays";

import { Container, Header } from "../styles";
import {
  Day,
  InputsWrapper,
  Interval,
  IntervalBox,
  IntervalsWrapper,
} from "./styles";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleTimeIntervalsFormSubmission() {}

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

      <IntervalBox
        as="form"
        onSubmit={handleSubmit(handleTimeIntervalsFormSubmission)}
      >
        <IntervalsWrapper>
          {fields.map((field, index) => (
            <Interval key={field.id}>
              <Day>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={(checked) => onChange(checked === true)}
                      checked={value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </Day>
              <InputsWrapper>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </InputsWrapper>
            </Interval>
          ))}
        </IntervalsWrapper>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
