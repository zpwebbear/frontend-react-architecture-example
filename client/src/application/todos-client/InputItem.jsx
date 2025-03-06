import { connect } from "react-redux";
import { UiButton } from "@/application/components/UiButton.jsx";
import { UiInput } from "@/application/components/UiInput.jsx";
import { todosActions } from "@/application/todos-client/todos.actions.js";
import { selectNewTodoName } from "@/application/todos-client/todos.selectors.js";

const mapStateToProps = (state) => ({
  name: selectNewTodoName(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch(todosActions.addTodoUseCase()),
  onNameChange: (name) => dispatch(todosActions.changeTodoName(name)),
});

const connected = connect(mapStateToProps, mapDispatchToProps);

const InputItemComponent = ({ name, onAdd, onNameChange }) => {
  return (
    <div className="flex items-center gap-2">
      <UiInput value={name} onChange={(e) => onNameChange(e.target.value)} />
      <UiButton onClick={onAdd}>Add</UiButton>
    </div>
  );
};

export const InputItem = connected(InputItemComponent);
