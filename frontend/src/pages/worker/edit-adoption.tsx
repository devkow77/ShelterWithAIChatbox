"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Container, Label } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Ban, Check, X } from "lucide-react";
import { toast } from "sonner";

const adoptionSchema = z.object({
  message: z.string().optional(),
  employeeNote: z
    .string()
    .max(500, "Notatka może mieć maksymalnie 500 znaków.")
    .optional(),
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

type AdoptionUser = {
  id: number;
  fullName: string;
  gender: string;
  phoneNumber?: string | null;
  city?: string | null;
  postalCode?: string | null;
  street?: string | null;
  dateOfBirth?: string | null;
  imageUrl?: string | null;
  adminNote?: string | null;
};

type AdoptionAnimal = {
  id: number;
  name: string;
  type: string;
  gender: string;
  dateOfBirth: string;
  imageUrl: string[];
};

type AdoptionDetails = {
  status: string;
  user: AdoptionUser;
  animal: AdoptionAnimal;
};

const ANIMAL_TYPE_LABELS: Record<string, string> = {
  PIES: "Pies",
  KOT: "Kot",
  KROLIK: "Królik",
  CHOMIK: "Chomik",
  ZOLW: "Żółw",
  INNE: "Inne",
};

const formatUserGender = (gender: string) =>
  gender === "MEZCZYZNA" ? "Mężczyzna" : gender === "KOBIETA" ? "Kobieta" : gender;

const formatAnimalGender = (gender: string) =>
  gender === "SAMIEC" ? "Samiec" : gender === "SAMICA" ? "Samica" : gender;

const calculateAge = (dateOfBirth: string | Date) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age <= 0) return "Mniej niż rok";
  if (age === 1) return "1 rok";
  if (age >= 2 && age <= 4) return `${age} lata`;
  return `${age} lat`;
};

const formatAddress = (user: AdoptionUser) => {
  const parts = [
    user.city,
    user.postalCode,
    user.street ? `ul. ${user.street}` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "Brak danych";
};

const EditAdoptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adoption, setAdoption] = useState<AdoptionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      message: "",
      employeeNote: "",
    },
  });

  useEffect(() => {
    const fetchAdoption = async () => {
      try {
        const res = await axios.get(`/api/adoptions/${id}`);
        const data = res.data;

        setAdoption({
          status: data.status,
          user: data.user,
          animal: data.animal,
        });

        reset({
          message: data.message || "",
          employeeNote: data.employeeNote || "",
        });
      } catch (err) {
        console.error("Błąd podczas pobierania danych adopcji:", err);
        toast.error("Nie udało się pobrać danych adopcji.");
        navigate("/admin/adopcje");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAdoption();
  }, [id, reset, navigate]);

  const onSubmit = async (
    data: AdoptionFormData,
    action: "accept" | "reject" | "cancel",
  ) => {
    try {
      await axios.post(`/api/adoptions/${id}/${action}`, data);
      toast.success("Wniosek został zaktualizowany.");
      navigate("/admin/adopcje");
    } catch (err) {
      console.error(err);
      toast.error("Nie udało się zaktualizować wniosku.");
    }
  };

  if (isLoading) {
    return (
      <main>
        <Container className="mb-6 md:mb-10">
          <p className="text-sm font-medium">Ładowanie danych adopcji...</p>
        </Container>
      </main>
    );
  }

  if (!adoption) {
    return null;
  }

  const { user, animal } = adoption;

  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
            Informacje o adopcji
          </h1>
          <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
            Wprowadź zmiany w adopcji zwierzęcia poniżej.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-4 lg:space-y-8">
            <div className="grid grid-cols-2 items-start gap-6 lg:gap-8">
              <div className="space-y-4">
                <h2 className="font-semibold">Dane osoby wnioskującej</h2>
                <div className="relative aspect-square w-40 rounded-full bg-black/20">
                  {user.imageUrl && (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="absolute h-full w-full rounded-full object-cover"
                    />
                  )}
                </div>
                <ul>
                  <li>
                    <span className="font-medium">Imię i nazwisko:</span>{" "}
                    {user.fullName}
                  </li>
                  <li>
                    <span className="font-medium">Wiek:</span>{" "}
                    {user.dateOfBirth
                      ? calculateAge(user.dateOfBirth)
                      : "Brak danych"}
                  </li>
                  <li>
                    <span className="font-medium">Adres zamieszkania:</span>{" "}
                    {formatAddress(user)}
                  </li>
                  <li>
                    <span className="font-medium">Płeć:</span>{" "}
                    {formatUserGender(user.gender)}
                  </li>
                  <li>
                    <span className="font-medium">Numer telefonu:</span>{" "}
                    {user.phoneNumber || "Brak danych"}
                  </li>
                  <li>
                    <span className="font-medium">Notatka administratora:</span>{" "}
                    {user.adminNote || "Brak notatki"}
                  </li>
                </ul>
                <Button variant="success" asChild>
                  <a href={`/admin/uzytkownicy/${user.id}/edycja`}>
                    Zobacz profil
                  </a>
                </Button>
              </div>

              <div className="flex items-end gap-x-2 lg:gap-x-4">
                <div className="space-y-4">
                  <h2 className="font-semibold">
                    Dane zwierzęcia adoptowanego
                  </h2>
                  <div className="relative aspect-square w-40 rounded-full bg-black/20">
                    {animal.imageUrl?.[0] && (
                      <img
                        src={animal.imageUrl[0]}
                        alt={animal.name}
                        className="absolute h-full w-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <ul>
                    <li>
                      <span className="font-medium">Imię:</span> {animal.name}
                    </li>
                    <li>
                      <span className="font-medium">Wiek:</span>{" "}
                      {calculateAge(animal.dateOfBirth)}
                    </li>
                    <li>
                      <span className="font-medium">Typ:</span>{" "}
                      {ANIMAL_TYPE_LABELS[animal.type] ?? animal.type}
                    </li>
                    <li>
                      <span className="font-medium">Płeć:</span>{" "}
                      {formatAnimalGender(animal.gender)}
                    </li>
                  </ul>
                  <Button variant="success" asChild>
                    <a href={`/admin/zwierzeta/${animal.id}/edycja`}>
                      Zobacz profil zwierzęcia
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-x-8">
              <div className="flex-1 space-y-2">
                <Label htmlFor="message">Wiadomość wnioskującego</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className="h-50 resize-none lg:h-75"
                  placeholder="Brak wiadomości od wnioskującego"
                  disabled
                />
                {errors.message && (
                  <p className="text-red-600">{errors.message.message}</p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="employeeNote">Odpowiedź pracownika</Label>
                <Textarea
                  id="employeeNote"
                  {...register("employeeNote")}
                  placeholder="Dodaj odpowiedź dla wnioskującego (np. powód odrzucenia wniosku)"
                  className="h-50 resize-none lg:h-75"
                />
                {errors.employeeNote && (
                  <p className="text-red-600">{errors.employeeNote.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <Button
              type="button"
              variant="success"
              disabled={isSubmitting}
              onClick={handleSubmit((data) => onSubmit(data, "accept"))}
            >
              Akceptuj wniosek <Check />
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isSubmitting}
              onClick={handleSubmit((data) => onSubmit(data, "reject"))}
            >
              Odrzuć wniosek <X />
            </Button>

            <Button
              type="button"
              variant="canceled"
              disabled={isSubmitting}
              onClick={handleSubmit((data) => onSubmit(data, "cancel"))}
            >
              Anuluj wniosek <Ban />
            </Button>
          </div>
        </form>
      </Container>
    </main>
  );
};

export default EditAdoptionPage;
