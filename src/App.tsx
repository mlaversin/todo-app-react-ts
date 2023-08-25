import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUser, CurrentUserContext } from "./contexts/CurrentUserContext";
import { FC, useState } from "react";
import TodoList from "./pages/TodoList";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App: FC = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: "",
    firstname: "",
    lastname: "",
  });

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
