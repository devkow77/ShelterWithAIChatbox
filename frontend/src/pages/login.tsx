import { Button, Container, Input, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Niepoprawny adres email."),

  password: z.string().min(1, "Hasło jest wymagane."),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
  token: string;
  user: {
    fullName: string;
    email: string;
    role: "USER" | "WORKER" | "ADMIN";
  };
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post<LoginResponse>("/api/auth/login", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err: any) {
      toast.info(err.response.data.msg);
    }
  };

  return (
    <main>
      <Container className="flex min-h-screen items-center justify-center">
        <article className="space-y-6 lg:space-y-8">
          <div className="space-y-2 lg:space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">Logowanie</h1>
            <p className="text-sm leading-5 md:text-base md:leading-6">
              Zaloguj się aby mieć pełny dostęp do funkcjonalności aplikacji.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <Label>Email</Label>
            <Input
              {...register("email")}
              className="mt-2 mb-4"
              placeholder="Podaj swój email..."
            />
            {errors.email && (
              <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <Label>Hasło</Label>
            <Input
              type="password"
              {...register("password")}
              className="mt-2 mb-4"
              placeholder="Podaj swoje hasło..."
            />
            {errors.password && (
              <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                {errors.password.message}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer bg-green-600"
              >
                {isSubmitting ? "Logowanie..." : "Zaloguj się"}
              </Button>

              <p className="text-sm lg:text-base">
                Nie masz konta?{" "}
                <a href="/register" className="font-semibold">
                  Zarejestruj się
                </a>
              </p>
            </div>
          </form>
        </article>
      </Container>
    </main>
  );
};

export default LoginPage;
