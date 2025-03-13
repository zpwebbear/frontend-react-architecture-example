import { connect } from "react-redux";
import { selectInstructions } from "./recipe.selectors";
import { Fragment } from "react";

const mapStateToProps = (state) => {
  return {
    instructions: selectInstructions(state),
  };
}

const connector = connect(mapStateToProps);

const InstructionItem = ({ instruction }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold dark:text-white">Day: {instruction.day}</h3>
      {instruction.periods.map(({ period, drugs }) => (
        <p className="text-gray-500 dark:text-gray-400">
          <span className="font-bold">{period}:</span> {drugs}
        </p>
      ))}
    </div>
  );
}

const InstructionsListComponent = ({ instructions }) => {
  return (
    <div className="flex flex-col gap-2">
      {instructions.map((instruction, index) => (
        <Fragment key={index}>
          <InstructionItem instruction={instruction} />
          <hr className="border-t border-gray-300 dark:border-gray-700" />
        </Fragment>
      ))}
    </div>
  );
}

export const InstructionsList = connector(InstructionsListComponent);