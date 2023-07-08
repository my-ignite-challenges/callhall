import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/axios";

import { ConfirmationForm, FormActions, FormError, Header } from "./styles";

const confirmationFormSchema = z.object({
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  remarks: z.string().nullable(),
});

type ConfirmationFormData = z.infer<typeof confirmationFormSchema>;

type ConfirmationStepProps = {
  scheduleDate: Date;
  dismissOrGoBack: () => void;
};

export function ConfirmationStep({
  scheduleDate,
  dismissOrGoBack,
}: ConfirmationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmationFormData>({
    resolver: zodResolver(confirmationFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleScheduleConfirmation(data: ConfirmationFormData) {
    const { name, email, remarks } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      remarks,
      date: scheduleDate,
    });

    dismissOrGoBack();
  }

  const formattedScheduledDate = dayjs(scheduleDate).format(
    "DD[ de ]MMMM[ de ]YYYY"
  );
  const formattedScheduledTime = dayjs(scheduleDate).format("HH:mm[h]");

  return (
    <ConfirmationForm
      as="form"
      onSubmit={handleSubmit(handleScheduleConfirmation)}
    >
      <Header>
        <Text>
          <CalendarBlank />
          {formattedScheduledDate}
        </Text>
        <Text>
          <Clock />
          {formattedScheduledTime}
        </Text>
      </Header>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register("email")}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("remarks")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={dismissOrGoBack}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmationForm>
  );
}
