"use client";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Container, Label } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { Ban, Check, X } from "lucide-react";

const TypeEnum = z.enum(["PIES", "KOT", "KROLIK", "CHOMIK", "ZOLW", "INNE"]);
const GenderEnum = z.enum(["SAMIEC", "SAMICA"]);
const SizeEnum = z.enum(["MALY", "SREDNI", "DUZY"]);
const StatusEnum = z.enum([
  "SZUKA_DOMU",
  "ZNALEZIONY",
  "W_TRAKCIE_ADOPCJI",
  "ADOPTOWANY",
]);

export const adoptionSchema = z.object({
  user: z.object({
    id: z.number(),
    fullName: z.string().min(1),
    email: z.string(),
    role: z.string(),
    gender: z.string(),
    imageUrl: z.string().optional(),
  }),

  animal: z.object({
    id: z.number(),
    name: z.string(),
    type: TypeEnum,
    gender: GenderEnum,
    status: StatusEnum,
    age: z.number(),
    size: SizeEnum,
    traits: z.string(),
    description: z.string(),
    imageUrl: z.array(z.string()),
    foundAt: z.date(),
    foundLocation: z.string(),
  }),

  status: z.enum([
    "SZUKA_DOMU",
    "W_TRAKCIE_ADOPCJI",
    "ADOPTOWANY",
    "ODRZUCONY",
  ]),

  message: z.string().optional(),
  employeeNote: z.string().optional(),
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

const EditAdoptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      user: {
        id: 1,
        fullName: "",
        email: "",
        role: "",
        gender: "",
        imageUrl: "",
      },
      animal: {
        id: 1,
        name: "",
        type: "INNE",
        gender: "SAMIEC",
        status: "SZUKA_DOMU",
        age: 0,
        size: "SREDNI",
        traits: "",
        description: "",
        imageUrl: [],
        foundAt: new Date(),
        foundLocation: "",
      },
      status: "SZUKA_DOMU",
      message: "",
      employeeNote: "",
    },
  });

  const user = watch("user");
  const animal = watch("animal");

  useEffect(() => {
    const fetchAdoption = async () => {
      try {
        const res = await axios.get(`/api/adoptions/${id}`);
        const data = res.data;

        console.log(data);

        reset({
          user: {
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
            gender: data.user.gender,
            imageUrl: data.user.imageUrl || "",
          },
          animal: {
            id: data.animal.id,
            name: data.animal.name,
            type: data.animal.type,
            gender: data.animal.gender,
            status: data.animal.status,
            age: data.animal.age,
            size: data.animal.size,
            traits: data.animal.traits,
            description: data.animal.description,
            imageUrl: data.animal.imageUrl || [],
            foundAt: data.animal.foundAt
              ? new Date(data.animal.foundAt)
              : new Date(),
            foundLocation: data.animal.foundLocation,
          },
          status: data.status,
          message: data.message || "",
          employeeNote: data.employeeNote || "",
        });
      } catch (err) {
        console.error("Błąd podczas pobierania danych adopcji:", err);
        navigate("/admin");
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
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

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

        <form onSubmit={handleSubmit(() => {})} className="space-y-6">
          <div className="space-y-4 lg:space-y-8">
            <div className="grid grid-cols-2 items-start gap-6 lg:gap-8">
              {/* INFORMACJE O UŻYTKOWNIKU */}
              <div className="space-y-4">
                <h2 className="font-semibold">Dane osoby wnioskującej</h2>
                <div className="relative aspect-square w-40 rounded-full bg-black/20">
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="absolute h-full w-full rounded-full object-cover"
                  />
                </div>
                <ul>
                  <li>
                    <span className="font-medium">Imię i nazwisko:</span>{" "}
                    {user.fullName}
                  </li>
                  <li>
                    <span className="font-medium">Wiek:</span> 20 lat
                  </li>
                  <li>
                    <span className="font-medium">Email:</span> {user.email}
                  </li>
                  <li>
                    <span className="font-medium">Adres zamieszkania:</span>{" "}
                    Rzeszów 35-505, ul. Kwiatowa 10
                  </li>
                  <li>
                    <span className="font-medium">Płeć:</span> {user.gender}
                  </li>
                </ul>
                <Button variant="success">
                  <a href={`/admin/uzytkownicy/${user.id}/edycja`}>
                    Zobacz profil
                  </a>
                </Button>
              </div>

              {/* INFORMACJE O ZWIERZĘCIU */}
              <div className="flex items-end gap-x-2 lg:gap-x-4">
                <div className="space-y-4">
                  <h2 className="font-semibold">
                    Dane zwierzęcia adoptowanego
                  </h2>
                  <div className="relative aspect-square w-40 rounded-full bg-black/20">
                    <img
                      src={animal.imageUrl?.[0]}
                      alt={animal.name}
                      className="absolute h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <ul>
                    <li>
                      <span className="font-medium">Imię:</span> Felix{" "}
                    </li>
                    <li>
                      <span className="font-medium">Wiek:</span> 2 lata{" "}
                    </li>
                    <li>
                      <span className="font-medium">Rasa:</span> Golden
                      Retriever
                    </li>
                    <li>
                      <span className="font-medium">Płeć:</span> Samiec
                    </li>
                  </ul>
                  <Button variant="success">
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
