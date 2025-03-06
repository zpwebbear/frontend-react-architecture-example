import { todosServerApiClient } from "@/infrastructure/http/apiClient.js";
import { createTransport } from "@/infrastructure/http/httpTransport.js";
import { createContext } from "react";

const transport = createTransport("http://localhost:3333");
const todosServerApi = todosServerApiClient(transport);

export const TodoServerApiContext = createContext({ todosServerApi });

export const TodoServerApiProvider = ({ children }) => {
  return (
    <TodoServerApiContext.Provider value={{ todosServerApi }}>
      {children}
    </TodoServerApiContext.Provider>
  );
}