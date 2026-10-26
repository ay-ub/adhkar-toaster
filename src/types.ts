import type { ToasterProps } from "sonner";

export type AdhkarCategory = "morning" | "evening" | "after-prayer" | "general";

export type Adhkar = {
  id: string;
  category: AdhkarCategory;
  text: string;
  source: string;
};

export type AdhkarSettings = {
  enabled: boolean;
  intervalMinutes: number;
  categories: AdhkarCategory[];
  sonner: ToasterProps;
};

export type AdhkarToasterConfig = Partial<Omit<AdhkarSettings, "sonner">> & {
  sonner?: Partial<ToasterProps>;
};
