export interface Location {
  id: number;
  name: string;
  title: string;
  description: string;
  coordinates: [number, number];
  imageUrl: string;
  isCustom?: boolean;
  learnMoreUrl?: string;
}

export type Coordinates = [number, number];
