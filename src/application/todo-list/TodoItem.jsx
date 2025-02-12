import {UiButton} from '@/application/components/UiButton.jsx';

export const TodoItem = ({ todo, onDelete, onMoveUp, onMoveDown }) => {
  return (
    <div className="flex items-center gap-2 w-full place-content-between">
      <span className="dark:text-white">{todo.name}</span>
      <UiButton onClick={onMoveUp}>&uarr;</UiButton>
      <UiButton onClick={onMoveDown}>&darr;</UiButton>
      <UiButton onClick={onDelete}>Delete</UiButton>
    </div>
  );
};
