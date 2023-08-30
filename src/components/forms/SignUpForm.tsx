import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

/*
 * This component is the registration form which is displayed
 * on the authentication page
 */
export default function SignUpForm() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("This field is required."),
    lastname: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Invalid email.")
      .required("This field is required."),
    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*[a-z])/,
        "The password must contain at least one lowercase letter."
      )
      .matches(
        /^(?=.*[A-Z])/,
        "The password must contain at least one lowercase letter."
      )
      .matches(/^(?=.*[0-9])/, "Password must contain at least one number."),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        //TODO : logique après création de compte
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
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
                  htmlFor="firstname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Firstname
                </label>
                <div className="mt-2">
                  <Field
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-xs pt-1 text-red-700">
                  <ErrorMessage name="firstname" />
                </div>
              </div>

              <div>
                <label htmlFor="lastname">Lastname</label>
                <div className="mt-2">
                  <Field
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    autoComplete="family-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-xs pt-1 text-red-700">
                  <ErrorMessage name="lastname" />
                </div>
              </div>

              <div>
                <label htmlFor="email">Email address</label>
                <div className="mt-2">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    noValidate
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
                <label htmlFor="password">Password</label>
                <div className="mt-2">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-xs text-slate-300">
                    8 characters min, at least one capital letter and one
                    number.
                  </p>
                </div>
                <div className="text-xs pt-1 text-red-700">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
}
