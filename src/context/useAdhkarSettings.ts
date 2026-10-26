import { useContext } from "react";
import { AdhkarSettingsContext } from "./settingsContext";

export function useAdhkarSettings() {
  const context = useContext(AdhkarSettingsContext);
  if (!context) {
    throw new Error(
      "useAdhkarSettings must be used within AdhkarSettingsProvider",
    );
  }
  return context;
}
