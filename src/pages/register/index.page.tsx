import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container, ErrorMessage, Form, Header } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterFormData = z.infer<typeof registerFormSchema>;

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Deve conter pelo menos 3 caracteres." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Somente letras e hífen são permitidos.",
    })
    .transform((username) => username.toLocaleLowerCase()),
  name: z.string().min(3, { message: "Deve conter pelo menos 3 caracteres." }),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegistration(data: RegisterFormData) {
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Call Hall!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />

        <Form as="form" onSubmit={handleSubmit(handleRegistration)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="callhall.com/"
              placeholder="seu-usuário"
              {...register("username")}
            />
            {errors.username && (
              <ErrorMessage>{errors?.username?.message}</ErrorMessage>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Header>
    </Container>
  );
}
