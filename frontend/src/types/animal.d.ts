export {};

export type AnimalType = "PIES" | "KOT" | "KROLIK" | "CHOMIK" | "ZOLW" | "INNE";
export type AnimalGender = "SAMICA" | "SAMIEC";
export type AnimalSize = "MALY" | "SREDNI" | "DUZY";
export type AnimalStatus =
  | "SZUKA_DOMU"
  | "ZNALEZIONY"
  | "W_TRAKCIE_ADOPCJI"
  | "ADOPTOWANY";

declare global {
  interface Animal {
    id: number;
    name: string;
    type: AnimalType;
    gender: AnimalGender;
    size: AnimalSize;
    traits: string;
    age: number;
    description: string;

    status: AnimalStatus;
    foundAt: Date;
    foundLocation: string;
    availableFrom: Date;

    imageUrl: string[];
  }
}
