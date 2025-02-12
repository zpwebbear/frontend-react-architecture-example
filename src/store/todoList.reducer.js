import {
  createTodoItem,
  deleteTodoItem,
  moveTodoItemUp,
  moveTodoItemDown,
} from "@/domain/todo-list/logic.js";

export const todoListReducer = (state = [], action) => {
  switch (action.type) {
    case "todoList/addTodo":
      const newTodo = createTodoItem(state, action.payload);
      return [...state, newTodo];
    case "todoList/deleteTodo":
      const newState = deleteTodoItem(state, action.payload);
      return newState;
    case "todoList/moveTodoUp":
      const movedUpState = moveTodoItemUp(state, action.payload);
      return movedUpState;
    case "todoList/moveTodoDown":
      const movedDownState = moveTodoItemDown(state, action.payload);
      return movedDownState;
    default:
      return state;
  }
};
