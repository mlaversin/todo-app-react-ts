import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";

/*
 * This component is the authentication page.
 * It contains the login form and the registration form.
 */
export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);
  const [register, setRegister] = useState(false);

  const handleForms = (e) => {
    if (e.target.id === "signup") {
      setSignUpForm(true);
      setLoginForm(false);
    } else {
      setSignUpForm(false);
      setLoginForm(true);
    }
  };

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Authentication
          </h1>
          <ul>
            <li
              id="login"
              className={`login-tab ${loginForm ? "active" : null}`}
              onClick={handleForms}
            >
              Se connecter
            </li>
            <li
              id="signup"
              className={`signup-tab ${signUpForm ? "active" : null}`}
              onClick={handleForms}
            >
              S'inscrire
            </li>
          </ul>

          {register && (
            <div className="success-message">
              <p>Votre compte a été créé. Merci de vous connecter.</p>
              <button
                className="btn"
                onClick={() => setRegister(false)}
              >
                x
              </button>
            </div>
          )}
          <div className="auth-modal">
            <div className="auth-modal-container">
              {loginForm && <LoginForm />}
              {signUpForm && (
                <SignUpForm
                  setRegister={setRegister}
                  setSignUpForm={setSignUpForm}
                  setLoginForm={setLoginForm}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
