import { Container } from "@/components/ui";
import {LoginForm, TotpLoginForm} from "@/components/auth"
import { useState } from "react";

const LoginPage = () => {
  const [tempToken, setTempToken] = useState<string | null>(null);

  return (
    <main>
      <Container className="flex min-h-screen items-center justify-center">
        <article className="space-y-6 lg:space-y-8">
          <div className="space-y-2 lg:space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">{tempToken ? "Weryfikacja dwuetapowa" : "Logowanie"}</h1>
            <p className="text-sm leading-5 md:text-base md:leading-6">
              Zaloguj się aby mieć pełny dostęp do funkcjonalności aplikacji.
            </p>
          </div>

          {tempToken ? <TotpLoginForm tempToken={tempToken} /> : <LoginForm on2FARequired={(token) => setTempToken(token)}/>}
        </article>
      </Container>
    </main>
  );
};

export default LoginPage;
