import React, { useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "./LoginSchema";
import { useHttp } from "../../customhooks/HttpCustomHook";
import { BASE_URL } from "../../constants/AppConstant";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import logo from "../../assets/aftl-logo.png";

const Login = () => {
  const initialValues = {
    name: "",
    password: "",
  };
  const alert = useAlert();

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const http = useHttp();

  const successFn = (response) => {
    if (response.data.status === "success") {
      const auth_token = `Bearer ${response.data["auth"]}`;
      const user = response.data["user"];
      sessionStorage.setItem("auth_token", response.data["auth"]);
      sessionStorage.setItem("user", JSON.stringify(response.data["user"]));
      dispatch(setAuth(auth_token));
      dispatch(setUser(user));
      if (user.entitlement.includes("webAdminBoth")) {
        navigate("/home/stocks");
      } else {
        navigate("/home/issue");
      }
    }
  };

  const failureFn = (error) => {
    setError(true);
    alert.error("Username/password didnt match");
  };

  const onSubmit = async (values, helpers) => {
    const req = {
      method: "POST",
      body: values,
      url: `${BASE_URL}/login`,
      successFn: successFn,
      errorFn: failureFn,
    };
    http(req);
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: LoginSchema,
  });

  return (
    <section
      style={{
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0 64px",
      }}
    >
      <div
        style={{
          flex: 1.5,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "20rem",
            height: "20rem",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            padding: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            style={{ width: "calc(100%)", height: "calc(100% )" }}
          />
        </div>
      </div>

      <div style={{ flex: 0.5 }}>
        <h4 style={{ textAlign: "center" }}>Member Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-outline form-white mb-4">
            {errors.name && touched.name && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}

            <label className="form-label" htmlFor="name">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={values.name}
              className="form-control form-control-lg"
            />
          </div>

          <div className="form-outline form-white mb-4">
            {errors.password && touched.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            <label className="form-label" htmlFor="typePasswordX">
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-control form-control-lg"
            />
          </div>

          {error && <p style={{ color: "red" }}>Bad Credentials</p>}

          <button
            className="btn btn-outline-dark btn-lg px-5"
            style={{ backgroundColor: "gray", width: "100%", color: "#fff" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
