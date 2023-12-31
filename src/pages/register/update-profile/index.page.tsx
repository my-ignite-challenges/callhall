import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/axios";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { Container, Header } from "../styles";

import { FormDescription, ProfileBox } from "./styles";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const updateProfileSchema = z.object({
  bio: z.string(),
});

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();

  async function handleProfileUpdate(data: UpdateProfileFormData) {
    await api.put("/users/profile", { bio: data.bio });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Call Hall" noindex />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Call Hall!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />

          <ProfileBox as="form" onSubmit={handleSubmit(handleProfileUpdate)}>
            <label>
              <Text>Foto de perfil</Text>
              <Avatar
                src={session.data?.user.avatar_url}
                alt={session.data?.user.name}
              />
            </label>

            <label>
              <Text size="sm">Sobre você</Text>
              <TextArea {...register("bio")} />
              <FormDescription size="sm">
                Fale um pouco sobre você. Isto será exibido em sua página
                pessoal.
              </FormDescription>
            </label>

            <Button type="submit" disabled={isSubmitting}>
              Finalizar
              <ArrowRight />
            </Button>
          </ProfileBox>
        </Header>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
