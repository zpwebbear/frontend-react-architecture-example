import { InstructionsList } from "./InstructionsList";

export const IngestionsInstructions = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <h2 className="text-4xl font-extrabold dark:text-white">Ingestion Instructions</h2>
      <InstructionsList />
    </div>
  );
}