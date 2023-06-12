import { Button, Text, TextInput } from "@ignite-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorMessage, Form } from "./styles";

type UsernameClaimFormData = z.infer<typeof usernameClaimSchema>;

const usernameClaimSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Deve conter pelo menos 3 caracteres." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Somente letras e hífen são permitidos.",
    })
    .transform((username) => username.toLocaleLowerCase()),
});

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameClaimFormData>({
    resolver: zodResolver(usernameClaimSchema),
  });

  async function handleUsernameClaim(data: UsernameClaimFormData) {
    console.log(data);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleUsernameClaim)}>
        <TextInput
          size="sm"
          prefix="callhall.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <ErrorMessage>
        <Text size="sm">
          {errors?.username
            ? errors.username?.message
            : "Reserve seu nome de usuário."}
        </Text>
      </ErrorMessage>
    </>
  );
}
