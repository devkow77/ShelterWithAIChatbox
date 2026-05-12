import { Container } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import DashboardNavbar from "@/components/layout/admin/DashboardNavbar";
import { z } from "zod";
import { Button, Input, Label } from "@/components/ui";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Hasło musi mieć min. 8 znaków")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.",
      ),
    newPassword: z
      .string()
      .min(8, "Hasło musi mieć min. 8 znaków")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.",
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Hasła muszą być takie same.",
    path: ["confirmNewPassword"],
  });

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

const AdminAccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      const res = await axios.patch("/api/user/password", data, {
        withCredentials: true,
      });
      toast.success(res.data.msg);
      await logout();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <section
          id="info"
          className="space-y-6 gap-x-12 text-center md:flex md:text-left"
        >
          <div className="relative mx-auto h-50 w-50 overflow-hidden rounded-full md:mx-0">
            <img
              src="/admin-logged-avatar.png"
              alt="profilowe administratora"
              className="absolute top-0 left-0 size-full object-cover"
              role="presentation"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Panel administratora
            </h1>
            <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
              Poniżej znajdują się twoje podstawowe dane z konta.
            </p>
            <ul className="space-y-2 text-sm leading-6 md:text-base md:leading-7">
              <li>Imię i nazwisko: {user?.fullName}</li>
              <li>Email: {user?.email}</li>
              <li>Typ konta: {user?.role}</li>
            </ul>
          </div>
        </section>
        <DashboardNavbar />
        <section id="editPassword" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-900 md:text-4xl">
              Chcesz zmienić hasło?
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Poniżej znajduje się formularz do zmiany dotychczasowego hasła.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Aktualne hasło</Label>
            <Input
              {...register("currentPassword")}
              className="mt-2 mb-4"
              placeholder="Podaj swoje aktualne hasło..."
              autoFocus
              type="password"
            />
            {errors.currentPassword && (
              <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                {errors.currentPassword.message}
              </p>
            )}
            <Label>Nowe hasło</Label>
            <Input
              {...register("newPassword")}
              className="mt-2 mb-4"
              placeholder="Podaj nowe hasło..."
              type="password"
            />
            {errors.newPassword && (
              <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                {errors.newPassword.message}
              </p>
            )}

            <Label>Powtórz nowe hasło</Label>
            <Input
              {...register("confirmNewPassword")}
              className="mt-2 mb-4"
              placeholder="Powtórz nowe hasło..."
              type="password"
            />
            {errors.confirmNewPassword && (
              <p className="-mt-2 mb-4 text-xs font-medium text-red-600 lg:text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}

            <Button
              type="submit"
              className="cursor-pointer bg-green-600"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Aktualizacja..." : "Ustaw nowe hasło"}
            </Button>
          </form>
        </section>
      </Container>
    </main>
  );
};

export default AdminAccountPage;
