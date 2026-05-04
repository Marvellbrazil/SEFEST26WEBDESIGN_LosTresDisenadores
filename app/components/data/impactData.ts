'use client';

export type FunFactIcon = 'leaf' | 'droplets' | 'trees';

export interface FunFactData {
  text: string;
  icon: FunFactIcon;
}

export const funFactsData: FunFactData[] = [
  { text: "1 rescued meal = 2.5kg CO₂ saved", icon: "leaf" },
  { text: "1 rescued meal = 840L water saved", icon: "droplets" },
  { text: "1 rescued meal = 1.2m² land saved", icon: "trees" },
];

export interface SDGData {
  sdg: string;
  name: string;
  current: number;
  target: number;
  color: string;
}

export const sdgData: SDGData[] = [
  { sdg: "12.3", name: "Halve Food Waste", current: 32, target: 50, color: "#F28F3B" },
  { sdg: "12.5", name: "Reduce Waste Generation", current: 28, target: 50, color: "#F28F3B" },
];

export const IMPACT_FACTORS = {
  co2: 2.5,
  water: 840,
  land: 1.2,
  trees: 0.15,
  showers: 12,
  carKm: 10,
  lightbulbs: 1.5,
};