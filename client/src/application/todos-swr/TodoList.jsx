import { UISpinner } from "@/application/components/UISpinner.jsx";
import { InputItem } from "@/application/todos-swr/InputItem.jsx";
import { TodoItem } from "@/application/todos-swr/TodoItem.jsx";
import { TodoServerApiContext } from "@/application/providers/todoServerApi.provider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const TodoList = () => {
  const { todosServerApi } = useContext(TodoServerApiContext);
  const { isPending: isLoading, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => todosServerApi.getTodos(),
  })

  return (
    <div>
      <h1 className="flex items-center justify-between text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Todos SWR
      </h1>
      {isLoading && <div className="flex items-center justify-center"><UISpinner /></div>}
      {!isLoading && (
        <ul>
          {data.data.map((todo, index) => (
            <li className="py-2" key={todo.id}>
              <TodoItem todo={todo} isFirst={index === 0} isLast={index === (data.data.length - 1)} />
            </li>
          ))}
          <li className="py-2">
            <InputItem />
          </li>
        </ul>
      )}
      {
      /* {isWarningVisible && <TodoListWarning />} */}
    </div>
  );
};
