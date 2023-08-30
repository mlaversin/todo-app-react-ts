import { useContext } from "react";
import { AuthUserContext } from "../contexts/AuthUserContext";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const authUserContext = useContext(AuthUserContext);
  const navigate = useNavigate();

  if (!authUserContext) {
    navigate("/auth");
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          My todo
        </h1>
      </div>
    </main>
  );
}
