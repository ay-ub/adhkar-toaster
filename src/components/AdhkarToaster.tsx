import { Toaster } from "sonner";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { adhkar } from "../data/adhkar";
import { scheduleAdhkar } from "../core/scheduler";
import { selectAdhkar } from "../core/select-adhkar";
import { useAdhkarSettings } from "../context/useAdhkarSettings";
import type { Adhkar, AdhkarToasterConfig } from "../types";

type AdhkarToasterProps = {
  settings?: AdhkarToasterConfig;
  adhkarItems?: readonly Adhkar[];
};

export function AdhkarToaster({
  settings: settingsOverrides,
  adhkarItems = adhkar,
}: AdhkarToasterProps) {
  const { settings: savedSettings } = useAdhkarSettings();
  const previousId = useRef<string | undefined>(undefined);
  const settings = {
    ...savedSettings,
    ...settingsOverrides,
    sonner: {
      ...savedSettings.sonner,
      ...settingsOverrides?.sonner,
      toastOptions: {
        ...savedSettings.sonner.toastOptions,
        ...settingsOverrides?.sonner?.toastOptions,
      },
    },
  };
  const sonnerSettings = {
    ...settings.sonner,
  };

  useEffect(() => {
    if (!settings.enabled) return;

    const eligibleAdhkar = adhkarItems.filter((item) =>
      settings.categories.includes(item.category),
    );
    if (eligibleAdhkar.length === 0) return;

    return scheduleAdhkar(() => {
      const selected = selectAdhkar(eligibleAdhkar, previousId.current);
      if (!selected) return;

      previousId.current = selected.id;
      toast(selected.text, {
        duration:
          selected.duration ?? sonnerSettings.toastOptions?.duration ?? 4000,
        closeButton: sonnerSettings.closeButton ?? false,
        toasterId: sonnerSettings.id,
        style: { direction: "rtl", textAlign: "right" },
      });
    }, settings.intervalMinutes * 60_000);
  }, [
    settings.enabled,
    settings.intervalMinutes,
    settings.categories,
    settings.sonner,
    adhkarItems,
    sonnerSettings.closeButton,
    sonnerSettings.id,
    sonnerSettings.toastOptions?.duration,
  ]);

  return <Toaster {...sonnerSettings} />;
}

export default AdhkarToaster;
