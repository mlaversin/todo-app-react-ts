import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthUserContextProvider } from "./contexts/AuthUserContext";
import { FC } from "react";
import Auth from "./pages/Auth";
import TodoList from "./pages/TodoList";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App: FC = () => {
  return (
    <div className="App">
      <AuthUserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<TodoList />}
            />
            <Route
              path="/auth"
              element={<Auth />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </AuthUserContextProvider>
    </div>
  );
};

export default App;
