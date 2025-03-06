import { createSelector } from "reselect";

const selectTodosUI = (state) => state.todosUI;

export const selectTodosAreLoading = createSelector(
  selectTodosUI,
  (state) => state.status === "loading"
);

export const selectTodosLoadingError = createSelector(
  selectTodosUI,
  (state) => state.error
);

export const selectTodosWarningText = createSelector(
  selectTodosUI,
  (state) => state.warningText
);

export const selectTodosWarningIsVisible = createSelector(
  selectTodosUI,
  (state) => state.warningIsVisible
);
