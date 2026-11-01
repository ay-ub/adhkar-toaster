import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdhkarSettingsProvider } from "./context/AdhkarSettingsContext";
import { AdhkarToaster } from "./components/AdhkarToaster.tsx";
import type { AdhkarToasterConfig } from "./types.ts";
const toasterSettings: AdhkarToasterConfig = {
  categories: ["morning", "evening", "after-prayer", "general"],
  sonner: {
    customAriaLabel: "تنبيهات الأذكار",
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdhkarSettingsProvider>
      <AdhkarToaster
        settings={toasterSettings}
        adhkarItems={[{ category: "after-prayer", id: "4", text: "ايوب" }]}
      />
    </AdhkarSettingsProvider>
  </StrictMode>,
);
