import { Provider } from "react-redux";
import { store } from "@/infrastructure/store/store.js";

const createdStore = store(); 

export const ReduxProvider = ({ children }) => {
  return <Provider store={createdStore}>{children}</Provider>;
};
