import "./index.css";
import { TodoList } from "./todos/TodoList.jsx";

export const App = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <TodoList />
    </div>
  );
};
