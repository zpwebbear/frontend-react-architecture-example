import { useState } from "react";
import { UiButton } from "@/application/components/UiButton.jsx";

export const InputItem = ({ onAdd }) => {
  const [name, setName] = useState("");
  const handleChange = (e) => setName(e.target.value);
  const handleAdd = () => {
    onAdd(name);
    setName("");
  };

  return (
    <div className="flex items-center gap-2">
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={name} onChange={handleChange} />
      <UiButton onClick={handleAdd}>Add</UiButton>
    </div>
  );
};
