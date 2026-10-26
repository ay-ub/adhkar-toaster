export type AdhkarCategory = "morning" | "evening" | "after-prayer" | "general";

export type Adhkar = {
  id: string;
  category: AdhkarCategory;
  text: string;
  repeat: number;
  source: string;
};
