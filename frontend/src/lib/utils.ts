import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ANIMALS
export const styleAnimalStatus = (status: string) => {
  let styles: string = "";

  switch (status) {
    case "SZUKA_DOMU":
      styles = "bg-red-200 text-red-600";
      break;
    case "ZNALEZIONY":
      styles = "bg-blue-200 text-blue-600";
      break;
    case "W_TRAKCIE_ADOPCJI":
      styles = "bg-yellow-200 text-yellow-600";
      break;
    case "ADOPTOWANY":
      styles = "bg-green-200 text-green-600";
      break;
    default:
      styles = "bg-slate-200 text-slate-600";
  }

  return styles;
};

export const styleAnimalHealthStatus = (status: string) => {
  let styles: string = "";

  switch (status) {
    case "ZDROWY":
      styles = "bg-green-200 text-green-600";
      break;
    case "CHORY":
      styles = "bg-red-200 text-red-600";
      break;
    case "ZARAŻONY":
      styles = "bg-yellow-200 text-yellow-600";
      break;
    case "POTRZEBUJE_OPERACJI":
      styles = "bg-purple-200 text-purple-600";
      break;
    default:
      styles = "bg-slate-200 text-slate-600";
  }

  return styles;
};

export const formatAnimalGender = (gender: string) =>
  gender === "SAMIEC" ? "Samiec" : gender === "SAMICA" ? "Samica" : gender;

export const formatAnimalType: Record<string, string> = {
  PIES: "Pies",
  KOT: "Kot",
  KROLIK: "Królik",
  CHOMIK: "Chomik",
  ZOLW: "Żółw",
  INNE: "Inne",
}

export const formatAnimalHealthStatus: Record<string, string> = {
  ZDROWY: "Zdrowy",
  CHORY: "Chory",
  ZARAŻONY: "Zarażony",
  POTRZEBUJE_OPERACJI: "Potrzebuje operacji",
}

// USERS
export const styleUserRole = (role: string) => {
  let styles: string = "";

  switch (role) {
    case "UZYTKOWNIK":
      styles = "bg-slate-200 text-slate-600";
      break;
    case "PRACOWNIK":
      styles = "bg-blue-200 text-blue-600";
      break;
    case "ADMINISTRATOR":
      styles = "bg-red-200 text-red-600";
      break;
    default:
      styles = "bg-slate-200 text-slate-600";
  }

  return styles;
};

export const formatUserGender = (gender: string) =>
  gender === "MEZCZYZNA" ? "Mężczyzna" : gender === "KOBIETA" ? "Kobieta" : gender;

// ADOPTION
export const styleAdoptionStatus = (status: string) => {
  let styles: string = "";

  switch (status) {
    case "OCZEKUJACA":
      styles = "bg-yellow-200 text-yellow-600";
      break;
    case "ZAAKCEPTOWANA":
      styles = "bg-green-200 text-green-600";
      break;
    case "ODRZUCONA":
      styles = "bg-red-200 text-red-600";
      break;
    case "ANULOWANA":
      styles = "bg-slate-200 text-slate-600";
      break;
    default:
      styles = "bg-slate-200 text-slate-600";
  }

  return styles;
};

export const formatAdoptionStatus: Record<string, string> = {
  OCZEKUJACA: "Oczekująca",
  ZAAKCEPTOWANA: "Zaakceptowana",
  ODRZUCONA: "Odrzucona",
  ANULOWANA: "Anulowana",
  ZAKONCZONA: "Zakończona",
}

// GLOBAL
export const calculateAge = (dateOfBirth: string | Date) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age <= 0) return "Mniej niż rok";
  if (age === 1) return "1 rok";
  if (age >= 2 && age <= 4) return `${age} lata`;
  return `${age} lat`;
};


