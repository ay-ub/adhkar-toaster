import { useEffect, useState, type PropsWithChildren } from "react";
import type { AdhkarCategory, AdhkarSettings } from "../types";
import type { ToasterProps } from "sonner";
import { AdhkarSettingsContext } from "./settingsContext";
import {
  categoryValues,
  defaultAdhkarSettings,
  STORAGE_KEY,
} from "./adhkarSettings";

function loadSettings(): AdhkarSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultAdhkarSettings;

    const parsed = JSON.parse(stored) as Partial<AdhkarSettings>;
    const savedSonner = parsed.sonner ?? {};
    const savedCategories = Array.isArray(parsed.categories)
      ? parsed.categories.filter((category): category is AdhkarCategory =>
          categoryValues.includes(category),
        )
      : defaultAdhkarSettings.categories;

    return {
      ...defaultAdhkarSettings,
      ...parsed,
      categories: savedCategories,
      intervalMinutes:
        typeof parsed.intervalMinutes === "number" && parsed.intervalMinutes > 0
          ? parsed.intervalMinutes
          : defaultAdhkarSettings.intervalMinutes,
      sonner: {
        ...defaultAdhkarSettings.sonner,
        ...savedSonner,
        toastOptions: {
          ...defaultAdhkarSettings.sonner.toastOptions,
          ...savedSonner.toastOptions,
        },
      },
    };
  } catch {
    return defaultAdhkarSettings;
  }
}

export function AdhkarSettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Keep the current session usable when storage is unavailable.
    }
  }, [settings]);

  function updateSettings(updates: Partial<Omit<AdhkarSettings, "sonner">>) {
    setSettings((current) => ({ ...current, ...updates }));
  }

  function updateSonner(updates: Partial<ToasterProps>) {
    setSettings((current) => ({
      ...current,
      sonner: {
        ...current.sonner,
        ...updates,
        toastOptions: updates.toastOptions
          ? { ...current.sonner.toastOptions, ...updates.toastOptions }
          : current.sonner.toastOptions,
      },
    }));
  }

  function resetSettings() {
    setSettings(defaultAdhkarSettings);
  }

  return (
    <AdhkarSettingsContext.Provider
      value={{ settings, updateSettings, updateSonner, resetSettings }}
    >
      {children}
    </AdhkarSettingsContext.Provider>
  );
}
