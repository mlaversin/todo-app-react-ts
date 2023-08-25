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
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .required("LPassword required")
      .matches(
        /^(?=.*[a-z])/,
        "Le mot de passe doit contenir au moins une minuscule."
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Le mot de passe doit contenir au moins une majuscule."
      )
      .matches(
        /^(?=.*[0-9])/,
        "Le mot de passe doit contenir au moins un chiffre."
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
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
          navigate("/todo");
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form
          className="form login-form"
          noValidate
        >
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
          />
          <div className="error-message">
            <ErrorMessage name="email" />
          </div>

          <label htmlFor="password">Mot de passe</label>
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
            Connexion
          </button>

          <div className="error-message">{errorMessage}</div>
        </Form>
      </Formik>
    </>
  );
}
