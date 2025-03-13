import { Route, Switch } from "wouter";
import { UiButton } from "./components/UiButton.jsx";
import { UiLink } from "./components/UiLink.jsx";
import "./index.css";
import { RecipeView } from "./recipe/RecipeView.jsx";
import { RecipeView as RecipeServerView } from "./recipe-server/RecipeView.jsx";
import { TodoList } from "./todos-client/TodoList.jsx";
import { TodoList as TodoListServer } from "./todos-server/TodoList.jsx";
import { TodoList as TodoListSWR } from "./todos-swr/TodoList.jsx";

export const App = () => {
  return (
    <div className="flex py-4 flex-col items-center h-screen">
      <nav className="mb-4 gap-2 flex items-center justify-center">
        <UiLink href="/">
          <UiButton>
            Todos Client
          </UiButton>
        </UiLink>
        <UiLink href="/todos-server">
          <UiButton>
            Todos Server
          </UiButton>
        </UiLink>
        <UiLink href="/todos-swr" >
          <UiButton>
            Todos SWR
          </UiButton>
        </UiLink>
        <UiLink href="/recipe">
          <UiButton>
            Recipe
          </UiButton>
        </UiLink>
        <UiLink href="/recipe-server">
          <UiButton>
            Recipe Server
          </UiButton>
        </UiLink>
      </nav>
      <Switch>
        <Route path="/todos-server">
          <TodoListServer />
        </Route>
        <Route path="/todos-swr">
          <TodoListSWR />
        </Route>
        <Route path="/">
          <TodoList />
        </Route>
        <Route path="/recipe">
          <RecipeView />
        </Route>
        <Route path="/recipe-server">
          <RecipeServerView />
        </Route>
      </Switch>
    </div>
  );
};
