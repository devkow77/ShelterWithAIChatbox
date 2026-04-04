import { Button, Container, Input, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "Imię i nazwisko musi mieć minimum 3 znaki.")
    .max(50, "Imię i nazwisko nie może mieć więcej niż 50 znaków."),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Niepoprawny adres email."),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć minimum 10 znaków.")
    .max(200, "Wiadomość nie może mieć więcej niż 200 znaków."),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || "",
      fullName: user?.fullName || "",
      message: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        fullName: user.fullName,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await axios.post("/api/contact", data);
      toast.info(res.data.msg);
    } catch (err: any) {
      toast.info(err.response.data.msg);
    }
  };

  const canSendMessage = !user || user.role === "USER";

  return (
    <main>
      <Container>
        <article className="space-y-6 lg:space-y-8">
          <div className="space-y-2 lg:space-y-4">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Kontakt
            </h1>
            <p className="text-sm leading-5 md:text-base md:leading-6">
              Skontaktuj się z nami, jeśli masz pytania lub potrzebujesz pomocy.
            </p>
          </div>
          {canSendMessage ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Label>Email</Label>
              <Input
                {...register("email")}
                className="mt-2 mb-4"
                placeholder="Podaj swój email..."
                disabled={!!user}
              />
              {errors.email && (
                <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                  {errors.email.message}
                </p>
              )}

              <Label>Imię i nazwisko</Label>
              <Input
                {...register("fullName")}
                className="mt-2 mb-4"
                placeholder="Podaj swoje imię i nazwisko..."
                disabled={!!user}
              />
              {errors.fullName && (
                <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                  {errors.fullName.message}
                </p>
              )}

              {/* Password */}
              <Label>Wiadomość</Label>
              <Textarea
                {...register("message")}
                className="mt-2 mb-4 resize-none md:h-50"
                placeholder="Podaj swoją wiadomość..."
              />
              {errors.message && (
                <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                  {errors.message.message}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer bg-green-600"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                </Button>

                <p className="text-sm lg:text-base">
                  Sprawdź czy twoje pytanie znajduje się w{" "}
                  <a href="/faq" className="font-semibold">
                    FAQ
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <p className="max-w-4xl text-sm leading-5 md:text-base md:leading-6">
              Jesteś zalogowany jako{" "}
              {user.role === "ADMIN" ? "administrator" : "pracownik"}. Aby
              zarządzać wiadomościami, przejdź do panelu{" "}
              <a href="/wiadomosci" className="font-semibold">
                wiadomości
              </a>
              .
            </p>
          )}
        </article>
      </Container>
    </main>
  );
};

export default ContactPage;
