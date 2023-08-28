import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

/*
 * This component is the login form which is displayed
 * on the authentication page
 */
export default function LoginForm() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email.")
      .required("This field is required."),
    password: Yup.string().required("This field is required."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values) => {
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          localStorage.setItem("userId", JSON.stringify(res.userId));
          localStorage.setItem("firstname", JSON.stringify(res.firstname));
          localStorage.setItem("lastname", JSON.stringify(res.lastname));
          localStorage.setItem("token", JSON.stringify(res.token));
          setCurrentUser({
            id: res.userId,
            firstname: res.firstname,
            lastname: res.lastname,
          });
          navigate("/");
        } else {
          setErrorMessage(res.error);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form
              className="space-y-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-xs pt-1 text-red-700">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>

                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-xs pt-1 text-red-700">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>

              <div className="text-xs pt-1 text-red-700">{errorMessage}</div>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
}
