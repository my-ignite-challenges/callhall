import { Heading, Text } from "@ignite-ui/react";
import Image from "next/image";
import { NextSeo } from "next-seo";

import previewImage from "../../assets/app-preview.png";

import { Container, Hero, Preview } from "./styles";
import { ClaimUserNameForm } from "./components/ClaimUserNameForm";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Call Hall"
        description="Conecte seu calendário."
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUserNameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário de agendamento"
          />
        </Preview>
      </Container>
    </>
  );
}
