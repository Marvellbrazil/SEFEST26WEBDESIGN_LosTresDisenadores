'use client';

export type IconName = 'trash2' | 'flame' | 'cloudRain' | 'treePine' | 'dollarSign';

export interface ProblemCardData {
  id: number;
  title: string;
  value: string;
  unit: string;
  description: string;
  icon: IconName;
  color: string;
  bgColor: string;
  textColor: string;
  leftOffset: string;
  top: string;
  rotation: string;
  floatOffset: number;
}

export const problemCardData: ProblemCardData[] = [
  {
    id: 1,
    title: "Food Waste",
    value: "1.3B",
    unit: "tons/year",
    description: "One-third of all food produced globally is lost or wasted",
    icon: "trash2",
    color: "#F28F3B",
    bgColor: "#1a1a1a",
    textColor: "#FFFFFF",
    leftOffset: "-620px",
    top: "-200px",
    rotation: "-4deg",
    floatOffset: 15
  },
  {
    id: 2,
    title: "GHG Emissions",
    value: "8-10%",
    unit: "of global emissions",
    description: "Food waste contributes more than the entire aviation industry",
    icon: "flame",
    color: "#F28F3B",
    bgColor: "#2D2A26",
    textColor: "#FFFFFF",
    leftOffset: "300px",
    top: "-180px",
    rotation: "4deg",
    floatOffset: -12
  },
  {
    id: 3,
    title: "Water Waste",
    value: "250km³",
    unit: "fresh water",
    description: "Water used to produce food that never gets eaten",
    icon: "cloudRain",
    color: "#2D2A26",
    bgColor: "#FFFFFF",
    textColor: "#2D2A26",
    leftOffset: "-600px",
    top: "40px",
    rotation: "2deg",
    floatOffset: 18
  },
  {
    id: 4,
    title: "Land Use",
    value: "1.4B",
    unit: "hectares",
    description: "Agricultural land used for wasted food production (28% of global farmland)",
    icon: "treePine",
    color: "#2D2A26",
    bgColor: "#FFFFFF",
    textColor: "#2D2A26",
    leftOffset: "330px",
    top: "30px",
    rotation: "-4deg",
    floatOffset: -15
  },
  {
    id: 5,
    title: "Economic Loss",
    value: "$1T",
    unit: "per year",
    description: "Global economic loss from food waste annually",
    icon: "dollarSign",
    color: "#2D2A26",
    bgColor: "#F28F3B",
    textColor: "#2D2A26",
    leftOffset: "-150px",
    top: "150px",
    rotation: "2deg",
    floatOffset: 10
  }
];