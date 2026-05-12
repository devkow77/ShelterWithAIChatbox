export {};

declare global {
  interface Animal {
    id: number;
    slug: string;
    name: string;
    type: string;
    gender: string;
    size: string;
    traits: string[];
    age: number;
    description: string;

    status: string;
    foundAt: Date;
    foundLocation: string;
    availableFrom: Date;

    createdAt: Date;
    updatedAt: Date;

    imageUrl: string[];
  }
}
