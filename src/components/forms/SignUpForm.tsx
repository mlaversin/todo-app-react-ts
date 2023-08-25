import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

/*
 * This component is the registration form which is displayed
 * on the authentication page
 */
export default function SignUpForm({
  setRegister,
  setSignUpForm,
  setLoginForm,
}) {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("This field is required."),
    lastname: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Email invalide")
      .required("This field is required."),
    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*[a-z])/,
        "The password must contain at least one lowercase letter."
      )
      .matches(
        /^(?=.*[A-Z])/,
        "The password must contain at least one uppercase letter."
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
    fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setRegister(true);
        setSignUpForm(false);
        setLoginForm(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form
          className="form signup-form"
          noValidate
        >
          <label htmlFor="firstname">Prénom</label>
          <Field
            type="firstname"
            id="firstname"
            name="firstname"
          />
          <div className="error-message">
            <ErrorMessage name="firstname" />
          </div>

          <label htmlFor="lastname">Nom</label>
          <Field
            type="lastname"
            id="lastname"
            name="lastname"
          />
          <div className="error-message">
            <ErrorMessage name="lastname" />
          </div>

          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            noValidate
          />
          <div className="error-message">
            <ErrorMessage name="email" />
          </div>

          <label htmlFor="password">Mot de passe</label>
          <p className="password-info">
            (8 caractères min, au moins une majuscule et un chiffre)
          </p>
          <Field
            type="password"
            id="password"
            name="password"
          />
          <div className="error-message">
            <ErrorMessage name="password" />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Inscription
          </button>
        </Form>
      </Formik>
    </>
  );
}
