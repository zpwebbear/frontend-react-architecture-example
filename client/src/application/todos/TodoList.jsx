import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import { InputItem } from "@/application/todos/InputItem.jsx";
import { TodoItem } from "@/application/todos/TodoItem.jsx";
import { todosActions } from "@/application/todos/todos.actions.js";
import { selectTodoListIds } from "@/application/todos/todos.selectors.js";
import {
  selectTodosAreLoading,
  selectTodosWarningIsVisible,
} from "@/application/todos/todosUI.selectors.js";
import { UISpinner } from "@/application/components/UISpinner.jsx";
import { addTodo } from "@/infrastructure/store/todos.thunks.js";
import { TodoListWarning } from "@/application/todos/TodoListWarning.jsx";

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
      {isLoading && <UISpinner />}
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
