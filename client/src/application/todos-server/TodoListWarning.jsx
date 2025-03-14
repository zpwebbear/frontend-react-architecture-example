import { connect } from "react-redux";
import { UIToastWarning } from "@/application/components/UIToastWarning.jsx";
import { todosUIActions } from "@/application/todos-client/todosUI.actions.js";
import { selectTodosWarningText } from "@/application/todos-client/todosUI.selectors.js";

const mapStateToProps = (state) => {
  return {
    message: selectTodosWarningText(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(todosUIActions.warningSetHidden()),
  };
};

export const TodoListWarning = connect(
  mapStateToProps,
  mapDispatchToProps
)(UIToastWarning);
