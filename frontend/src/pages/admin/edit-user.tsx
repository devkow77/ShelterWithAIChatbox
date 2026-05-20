"use client";

import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button, Container, Input, Label } from "@/components/ui";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxChips,
  ComboboxChipsInput,
} from "@/components/ui/combobox";
import axios from "axios";
import { Plus, Star, Trash } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
);

type AppUser = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  gender: string;
  imageUrl?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
};

export const userSchema = z.object({
  fullName: z.string().min(1, "Imię jest wymagane"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Niepoprawny adres email."),
  role: z.string().min(1, "Rola jest wymagana"),
  gender: z.string().min(1, "Płeć jest wymagana"),
  imageUrl: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

type SelectorProps = {
  items: string[];
  placeholder: string;
  value: string | null;
  onValueChange: (v: string | null) => void;
};

const GenericSelector = ({
  items,
  placeholder,
  value,
  onValueChange,
}: SelectorProps) => (
  <Combobox items={items} value={value} onValueChange={onValueChange}>
    <ComboboxChips>
      <ComboboxChipsInput
        placeholder={placeholder}
        className="placeholder:text-muted-foreground py-1 text-sm lg:text-base"
      />
    </ComboboxChips>

    <ComboboxContent>
      <ComboboxEmpty>Brak opcji</ComboboxEmpty>

      <ComboboxList>
        {items.map((item) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        ))}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
);

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userRoles = ["ADMINISTRATOR", "PRACOWNIK", "UZYTKOWNIK"];
  const userGenders = ["MEZCZYZNA", "KOBIETA"];

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      gender: "",
      imageUrl: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [deletedImage, setDeletedImage] = useState<string | null>(null);

  const [meta, setMeta] = useState({
    twoFactorEnabled: false,
    createdAt: "",
  });

  const existingImage = watch("imageUrl");

  const previewImage = pendingFile
    ? URL.createObjectURL(pendingFile)
    : existingImage;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<AppUser>(`/api/users/${id}`);

        reset({
          fullName: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          gender: res.data.gender,
          imageUrl: res.data.imageUrl || "",
        });

        setMeta({
          twoFactorEnabled: res.data.twoFactorEnabled,
          createdAt: res.data.createdAt,
        });
      } catch {
        toast.error("Nie udało się pobrać danych pracownika.");
        navigate("/admin/pracownicy");
      }
    };

    if (id) fetchUser();
  }, [id, reset, navigate]);

  useEffect(() => {
    if (!pendingFile) return;

    const url = URL.createObjectURL(pendingFile);

    return () => URL.revokeObjectURL(url);
  }, [pendingFile]);

  const onSubmit = async (data: UserFormData) => {
    try {
      let uploadedUrl = data.imageUrl || "";

      if (pendingFile) {
        const filePath = `${id}/${Date.now()}-${pendingFile.name}`;

        const { error } = await supabase.storage
          .from("users")
          .upload(filePath, pendingFile);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("users")
          .getPublicUrl(filePath);

        uploadedUrl = publicUrlData.publicUrl;
      }

      if (deletedImage) {
        const path = decodeURIComponent(
          new URL(deletedImage).pathname.replace(
            "/storage/v1/object/public/users/",
            "",
          ),
        );

        await supabase.storage.from("users").remove([path]);
      }

      await axios.patch(`/api/users/${id}`, {
        ...data,
        imageUrl: uploadedUrl,
      });

      toast.success("Dane pracownika zostały zaktualizowane");
      navigate("/admin/pracownicy");
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        const message =
          err?.response?.data.msg || "Wystąpił błąd podczas zapisywania.";

        toast(message);
      }

      toast("Wystąpił błąd podczas zapisywania.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setPendingFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    if (existingImage) {
      setDeletedImage(existingImage);
      setValue("imageUrl", "");
    }

    setPendingFile(null);
  };

  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
            Edytuj dane
          </h1>
          <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
            Wprowadź zmiany w profilu pracownika poniżej. Pamiętaj, aby zapisać
            po zakończeniu edycji.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <Label htmlFor="name">Zdjęcie (maksymalnie 1)</Label>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200">
                {previewImage ? (
                  <>
                    <span
                      onClick={() => handleRemoveImage()}
                      className="absolute top-15 right-3 z-10 cursor-pointer rounded-full bg-white p-1 sm:p-2"
                    >
                      <Trash className="text-red-600" />
                    </span>

                    <span className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white/10 p-1 sm:p-2">
                      <Star className="text-yellow-600" />
                    </span>

                    <div className="absolute z-2 size-full bg-linear-to-l from-black/40 to-transparent" />

                    <img
                      src={previewImage}
                      className="absolute size-full object-cover"
                    />
                  </>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex size-full cursor-pointer items-center justify-center text-gray-400"
                  >
                    <Plus size={26} />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Weryfikacja 2FA</Label>
                  <p
                    className={
                      meta.twoFactorEnabled ? "text-green-600" : "text-red-600"
                    }
                  >
                    {meta.twoFactorEnabled ? "Aktywna" : "Nieaktywna"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Konto utworzone</Label>
                  <p>
                    {meta.createdAt
                      ? new Date(meta.createdAt).toLocaleDateString("pl-PL")
                      : "-"}{" "}
                    r.
                  </p>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
            <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Imię i nazwisko</Label>
                <Input
                  {...register("fullName")}
                  placeholder="Podaj imię i nazwisko..."
                  className={errors.fullName ? "bg-red-600/20" : ""}
                />
                {errors.fullName && (
                  <p className="text-xs font-medium text-red-600 lg:text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  {...register("email")}
                  placeholder="Podaj email..."
                  className={errors.email ? "bg-red-600/20" : ""}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-600 lg:text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Rola</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <GenericSelector
                      items={userRoles}
                      placeholder="Wybierz rolę"
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Płeć</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <GenericSelector
                      items={userGenders}
                      placeholder="Wybierz płeć"
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant={"success"} disabled={isSubmitting}>
            {isSubmitting ? "Zapisywanie..." : "Zaktualizuj dane pracownika"}
          </Button>
        </form>
      </Container>
    </main>
  );
};

export default EditUserPage;
