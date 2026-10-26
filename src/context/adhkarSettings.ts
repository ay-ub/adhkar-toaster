import type { AdhkarCategory, AdhkarSettings } from "../types";

export const STORAGE_KEY = "adhkar-settings-v1";

export const categoryValues: AdhkarCategory[] = [
  "morning",
  "evening",
  "after-prayer",
  "general",
];

export const defaultAdhkarSettings: AdhkarSettings = {
  enabled: false,
  intervalMinutes: 30,
  categories: categoryValues,
  sonner: {
    theme: "light",
    richColors: false,
    expand: false,
    visibleToasts: 3,
    id: "adhkar-toaster",
    position: "bottom-right",
    closeButton: false,
    offset: "32px",
    mobileOffset: "16px",
    swipeDirections: ["right", "bottom"],
    dir: "rtl",
    hotkey: ["altKey", "t"],
    invert: false,
    toastOptions: { duration: 4000 },
    gap: 14,
    icons: {},
  },
};
