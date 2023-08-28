import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";

/*
 * This component is the authentication page.
 * It contains the login form and the registration form.
 */
export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);

  const toggleForms = () => {
    setLoginForm(!loginForm);
  };

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center min-w-[40%]">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Welcome
          </h1>

          <div>{loginForm ? <LoginForm /> : <SignUpForm />}</div>

          <p className="text-center text-sm text-gray-500">
            {loginForm ? "Not a member? " : "Already member? "}
            <a
              onClick={toggleForms}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              {loginForm ? "Create Account" : "Sign in"}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
