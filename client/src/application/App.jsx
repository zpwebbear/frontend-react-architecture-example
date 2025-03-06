import "./index.css";
import { Link, Route, Switch } from "wouter";
import { TodoList } from "./todos-client/TodoList.jsx";
import { TodoList as TodoListServer } from "./todos-server/TodoList.jsx";
import { TodoList as TodoListSWR } from "./todos-swr/TodoList.jsx";
import { UiButton } from "./components/UiButton.jsx";

export const App = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <nav className="mb-4 gap-2 flex items-center justify-center">
        <Link href="/" className={(active) => (active ? "*:text-yellow-500!" : "")}>
          <UiButton>
            Todos Client
          </UiButton>
        </Link>
        <Link href="/todos-server" className={(active) => (active ? "*:text-yellow-500!" : "")}>
          <UiButton>
            Todos Server
          </UiButton>
        </Link>
        <Link href="/todos-swr" className={(active) => (active ? "*:text-yellow-500!" : "")}>
          <UiButton>
            Todos SWR
          </UiButton>
        </Link>
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
      </Switch>
    </div>
  );
};
