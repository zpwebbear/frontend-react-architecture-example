import { UiButton } from "@/application/components/UiButton.jsx";
import { queryClient } from "@/application/providers/query.provider";
import { TodoServerApiContext } from "@/application/providers/todoServerApi.provider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const TodoItem = ({
  todo,
  isFirst,
  isLast
}) => {
  const {todosServerApi} = useContext(TodoServerApiContext);
  const onMoveUp =  useMutation({
    mutationFn: () => todosServerApi.moveTodoUp(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  
  const onMoveDown =  useMutation({
    mutationFn: () => todosServerApi.moveTodoDown(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const onDelete = useMutation({
    mutationFn: () => todosServerApi.deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="flex items-center gap-2 w-full place-content-end">
      <span className="dark:text-white mr-auto">{todo.name}</span>
      {!isFirst && <UiButton onClick={onMoveUp.mutate}>&uarr;</UiButton>}
      {!isLast && <UiButton onClick={onMoveDown.mutate}>&darr;</UiButton>}
      <UiButton onClick={onDelete.mutate}>Delete</UiButton>
    </div>
  );
};