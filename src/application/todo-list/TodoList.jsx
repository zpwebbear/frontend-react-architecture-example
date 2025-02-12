import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import { InputItem } from "@/application/todo-list/InputItem.jsx";
import { TodoItem } from "@/application/todo-list/TodoItem.jsx";
import { todoListActions } from "@/application/todo-list/todoList.actions.js";
import { selectTodoListIds } from "@/application/todo-list/todoList.selectors.js";

const mapStateToProps = (state) => {
  return {
    ids: selectTodoListIds(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (name) => dispatch(todoListActions.addTodo(name)),
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
