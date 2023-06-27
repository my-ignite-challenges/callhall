import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/axios";
import { convertStringTimeToMinutes } from "@/utils/convertStringTimeToMinutes";
import { getWeekDays } from "@/utils/getWeekDays";

import { Container, Header } from "../styles";
import {
  Day,
  ErrorMessage,
  InputsWrapper,
  Interval,
  IntervalBox,
  IntervalsWrapper,
} from "./styles";

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana.",
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertStringTimeToMinutes(interval.startTime),
        endTimeInMinutes: convertStringTimeToMinutes(interval.endTime),
      }))
    )
    .refine((intervals) => {
      return intervals.every(
        (interval) =>
          interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        {
          message:
            "O horário de término deve ser pelo menos 1h distante do horário de início.",
        }
      );
    }),
});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const router = useRouter();

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleTimeIntervalsFormSubmission(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput;
    await api.post("/users/time-intervals", { intervals });

    await router.push("/register/update-profile");
  }

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

        {errors.intervals && (
          <ErrorMessage size="sm">{errors.intervals.message}</ErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
