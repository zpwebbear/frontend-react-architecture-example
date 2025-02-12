import { Provider } from "react-redux";
import { store } from "@/infrastructure/store/store.js";

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
