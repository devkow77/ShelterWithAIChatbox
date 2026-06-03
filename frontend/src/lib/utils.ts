import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
