export {};

export type AnimalType = "PIES" | "KOT" | "KROLIK" | "CHOMIK" | "ZOLW" | "INNE";
export type AnimalGender = "SAMICA" | "SAMIEC";
export type AnimalSize = "MALY" | "SREDNI" | "DUZY";
export type AnimalStatus =
  | "SZUKA_DOMU"
  | "ZNALEZIONY"
  | "W_TRAKCIE_ADOPCJI"
  | "ADOPTOWANY";
  export type  AnimalHealthStatusList = ["ZDROWY", "CHORY", "ZARAŻONY", "POTRZEBUJE_OPERACJI"];

declare global {
  interface Animal {
    id: number;
    name: string;
    type: AnimalType;
    gender: AnimalGender;
    size: AnimalSize;
    traits: string;
    dateOfBirth: Date;
    description: string;
    status: AnimalStatus;
    healthStatus: AnimalHealthStatus;
    nextVisitDate: Date;
    foundAt: Date;
    foundLocation: string;
    availableFrom: Date;
    imageUrl: string[];
  }
}
