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
