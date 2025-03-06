import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReduxProvider } from "@/application/providers/redux.provider.jsx";
import { App } from "@/application/App.jsx";
import { QueryProvider } from "@/application/providers/query.provider";
import { TodoServerApiProvider } from "./application/providers/todoServerApi.provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoServerApiProvider>
      <ReduxProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ReduxProvider>
    </TodoServerApiProvider>
  </StrictMode>
);
