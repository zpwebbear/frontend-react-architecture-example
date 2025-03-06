import { Provider } from "react-redux";
import { store } from "@/infrastructure/store/store.js";
import { todosActions } from "@/application/todos-client/todos.actions.js";

const createdStore = store();

createdStore.dispatch(todosActions.fetchTodos());

export const ReduxProvider = ({ children }) => {
  return <Provider store={createdStore}>{children}</Provider>;
};
