import { UiButton } from "@/application/components/UiButton.jsx";
import { UiInput } from "@/application/components/UiInput.jsx";
import { queryClient } from "@/application/providers/query.provider";
import { TodoServerApiContext } from "@/application/providers/todoServerApi.provider";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

export const InputItem = () => {
  const [name, setName] = useState("");
  const onNameChange = (name) => setName(name);
  const { todosServerApi } = useContext(TodoServerApiContext);
  const onAdd = useMutation({
    mutationFn: () => todosServerApi.createTodo(name),
    onSuccess: () => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex items-center gap-2">
      <UiInput value={name} onChange={(e) => onNameChange(e.target.value)} />
      <UiButton onClick={onAdd.mutate}>Add</UiButton>
    </div>
  );
};
