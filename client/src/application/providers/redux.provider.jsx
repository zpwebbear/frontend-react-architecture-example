import { Provider } from "react-redux";
import { store } from "@/infrastructure/store/store.js";
import { fetchTodos } from "@/infrastructure/store/todos.thunks.js";

const createdStore = store();

createdStore.dispatch(fetchTodos());

export const ReduxProvider = ({ children }) => {
  return <Provider store={createdStore}>{children}</Provider>;
};
