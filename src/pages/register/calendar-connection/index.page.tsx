import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";

import { Container, Header } from "../styles";
import { AuthErrorMessage, ConnectionBox, ConnectionItem } from "./styles";

export default function CalendarConnection() {
  const session = useSession();
  const router = useRouter();

  const hasAuthPermissionsError = !!router.query.error;
  const userIsSignedIn = session.status === "authenticated";

  async function handleCalendarConnection() {
    await signIn("google");
  }

  async function handleNavigationToNextStep() {
    await router.push("/register/time-intervals");
  }

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
          {userIsSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCalendarConnection}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectionItem>

        {hasAuthPermissionsError && (
          <AuthErrorMessage size="sm">
            Falha na conexão com o Google. Verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthErrorMessage>
        )}

        <Button
          type="submit"
          disabled={!userIsSignedIn}
          onClick={handleNavigationToNextStep}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectionBox>
    </Container>
  );
}
