import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReduxProvider } from "@/application/providers/redux.provider.jsx";
import { App } from "@/application/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>
);
