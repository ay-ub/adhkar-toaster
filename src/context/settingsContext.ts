import { createContext } from "react";
import type { AdhkarSettings } from "../types";
import type { ToasterProps } from "sonner";

export type AdhkarSettingsContextValue = {
  settings: AdhkarSettings;
  updateSettings: (updates: Partial<Omit<AdhkarSettings, "sonner">>) => void;
  updateSonner: (updates: Partial<ToasterProps>) => void;
  resetSettings: () => void;
};

export const AdhkarSettingsContext =
  createContext<AdhkarSettingsContextValue | null>(null);
