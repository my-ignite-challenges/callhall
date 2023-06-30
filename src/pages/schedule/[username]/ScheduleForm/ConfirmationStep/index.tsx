import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ConfirmationForm, FormActions, FormError, Header } from "./styles";

const confirmationFormSchema = z.object({
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres."),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  observations: z.string().nullable(),
});

type ConfirmationFormData = z.infer<typeof confirmationFormSchema>;

export function ConfirmationStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmationFormData>({
    resolver: zodResolver(confirmationFormSchema),
  });

  function handleScheduleConfirmation(data: ConfirmationFormData) {}

  return (
    <ConfirmationForm
      as="form"
      onSubmit={handleSubmit(handleScheduleConfirmation)}
    >
      <Header>
        <Text>
          <CalendarBlank />
          22 de setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
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
        <TextArea {...register("observations")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmationForm>
  );
}
