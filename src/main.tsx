import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdhkarSettingsProvider } from "./context/AdhkarSettingsContext";
import { AdhkarToaster } from "./components/AdhkarToaster.tsx";
const toasterSettings = {
  sonner: {
    customAriaLabel: "تنبيهات الأذكار",
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdhkarSettingsProvider>
      <AdhkarToaster settings={toasterSettings} />
    </AdhkarSettingsProvider>
  </StrictMode>,
);
