import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { api } from "@/lib/axios";

import { Container, Header } from "../styles";
import { ConnectionBox, ConnectionItem } from "./styles";

export default function CalendarConnection() {
  async function handleCalendarConnection(data: any) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectionBox>
        <ConnectionItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectionItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectionBox>
    </Container>
  );
}
