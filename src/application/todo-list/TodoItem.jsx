import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import {
  selectTodoById,
  selectIsLastTodo,
  selectIsFirstTodo,
} from "@/application/todo-list/todoList.selectors.js";
import { todoListActions } from "@/application/todo-list/todoList.actions.js";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;

  return {
    id,
    todo: selectTodoById(state, id),
    isLast: selectIsLastTodo(state, id),
    isFirst: selectIsFirstTodo(state, id),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;

  return {
    onDelete: () => dispatch(todoListActions.deleteTodo(id)),
    onMoveUp: () => dispatch(todoListActions.moveTodoUp(id)),
    onMoveDown: () => dispatch(todoListActions.moveTodoDown(id)),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const TodoItemComponent = ({
  todo,
  isLast,
  isFirst,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className="flex items-center gap-2 w-full place-content-end">
      <span className="dark:text-white mr-auto">{todo.name}</span>
      {!isFirst && <UiButton onClick={onMoveUp}>&uarr;</UiButton>}
      {!isLast && <UiButton onClick={onMoveDown}>&darr;</UiButton>}
      <UiButton onClick={onDelete}>Delete</UiButton>
    </div>
  );
};

export const TodoItem = connector(TodoItemComponent);
