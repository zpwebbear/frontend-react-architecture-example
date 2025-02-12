import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import { InputItem } from "@/application/todo-list/InputItem.jsx";
import { TodoItem } from "@/application/todo-list/TodoItem.jsx";

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (name) =>
      dispatch({ type: "todoList/addTodo", payload: { name } }),
    deleteTodo: (id) =>
      dispatch({ type: "todoList/deleteTodo", payload: { id } }),
    moveTodoUp: (id) =>
      dispatch({ type: "todoList/moveTodoUp", payload: { id } }),
    moveTodoDown: (id) =>
      dispatch({ type: "todoList/moveTodoDown", payload: { id } }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const TodoListComponent = ({
  addTodo,
  todoList,
  deleteTodo,
  moveTodoUp,
  moveTodoDown,
}) => {
  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <li className="py-2">
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              onMoveUp={() => moveTodoUp(todo.id)}
              onMoveDown={() => moveTodoDown(todo.id)}
            />
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
