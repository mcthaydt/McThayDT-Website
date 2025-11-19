export interface Psychographic {
  id: number;
  type: "stat" | "fact";
  label: string;
  value: string;
  maxValue?: number;
  suffix?: string;
  order: number;
}

export const psychographics: Psychographic[] = [
  // Stats
  { id: 1, type: "stat", label: "Openness", value: "96", maxValue: 100, suffix: "%", order: 1 },
  { id: 2, type: "stat", label: "Conscientiousness", value: "92", maxValue: 100, suffix: "%", order: 2 },
  { id: 3, type: "stat", label: "Extraversion", value: "45", maxValue: 100, suffix: "%", order: 3 },
  { id: 4, type: "stat", label: "Agreeableness", value: "55", maxValue: 100, suffix: "%", order: 4 },
  { id: 5, type: "stat", label: "Neuroticism", value: "35", maxValue: 100, suffix: "%", order: 5 },
  // Facts
  { id: 6, type: "fact", label: "Myers-Briggs", value: "INTJ-A", order: 6 },
  { id: 7, type: "fact", label: "Enneagram", value: "Type 5w6", order: 7 },
  { id: 8, type: "fact", label: "Sun", value: "Scorpio", order: 8 },
  { id: 9, type: "fact", label: "Moon", value: "Aquarius", order: 9 },
  { id: 10, type: "fact", label: "Rising", value: "Virgo", order: 10 },
  { id: 11, type: "fact", label: "Mercury", value: "Scorpio", order: 11 },
  { id: 12, type: "fact", label: "Venus", value: "Capricorn", order: 12 },
  { id: 13, type: "fact", label: "Mars", value: "Virgo", order: 13 },
];
