import { UISpinner } from "@/application/components/UISpinner.jsx";
import { InputItem } from "@/application/todos-client/InputItem.jsx";
import { TodoItem } from "@/application/todos-client/TodoItem.jsx";
import { TodoListWarning } from "@/application/todos-client/TodoListWarning.jsx";
import { selectTodoListIds } from "@/application/todos-client/todos.selectors.js";
import {
  selectTodosAreLoading,
  selectTodosWarningIsVisible,
} from "@/application/todos-client/todosUI.selectors.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    ids: selectTodoListIds(state),
    isLoading: selectTodosAreLoading(state),
    isWarningVisible: selectTodosWarningIsVisible(state),
  };
};

const connector = connect(mapStateToProps);

const TodoListComponent = ({ ids, isLoading, isWarningVisible, addTodo }) => {
  return (
    <div>
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Todos Client
      </h1>
      {isLoading && <div className="flex items-center justify-center"><UISpinner /></div>}
      {!isLoading && (
        <ul>
          {ids.map((id) => (
            <li className="py-2" key={id}>
              <TodoItem id={id} />
            </li>
          ))}
          <li className="py-2">
            <InputItem />
          </li>
        </ul>
      )}
      {isWarningVisible && <TodoListWarning />}
    </div>
  );
};

export const TodoList = connector(TodoListComponent);
