import "./index.css";
import {TodoList} from "./todo-list/TodoList.jsx";

export const App = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <TodoList />
    </div>
  );
};
