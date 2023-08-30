import { useContext } from "react";
import { AuthUserContext } from "../contexts/AuthUserContext";

export default function Profile() {
  const authUserContext = useContext(AuthUserContext);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          My Profile
        </h1>
        <h2>{authUserContext?.authUser?.firstname}</h2>
      </div>
    </main>
  );
}
