import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import { InputItem } from "@/application/todos/InputItem.jsx";
import { TodoItem } from "@/application/todos/TodoItem.jsx";
import { todosActions } from "@/application/todos/todos.actions.js";
import { selectTodoListIds } from "@/application/todos/todos.selectors.js";

const mapStateToProps = (state) => {
  return {
    ids: selectTodoListIds(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (name) => dispatch(todosActions.addTodo(name)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const TodoListComponent = ({ ids, addTodo }) => {
  return (
    <div>
      <ul>
        {ids.map((id) => (
          <li className="py-2" key={id}>
            <TodoItem id={id} />
          </li>
        ))}
        <li className="py-2">
          <InputItem onAdd={addTodo} />
        </li>
      </ul>
    </div>
  );
};

export const TodoList = connector(TodoListComponent);
