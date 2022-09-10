import React from "react";
import { useFormik } from "formik";
import { LoginSchema } from "./LoginSchema";
import { useHttp } from "../../customhooks/HttpCustomHook";
import { BASE_URL } from "../../constants/AppConstant";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = {
    name: "",
    password: "",
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const http = useHttp();

  const successFn = (response) => {
    if (response.data.status === "success") {
      const auth_token = `Bearer ${response.data["auth"]}`;
      const user = response.data["user"];
      sessionStorage.setItem("auth_token", response.data["auth"]);
      dispatch(setAuth(auth_token));
      dispatch(setUser(user));
      navigate("/home/stocks");
    }
  };

  const failureFn = (error) => {
    alert(error);
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
    <section>
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-light text-black">
              <div className="card-body p-3 text-center">
                <div className="mb-md-1 mt-md-1 pb-2">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      {errors.name && touched.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="name">
                        Username
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      {errors.password && touched.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )}
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn btn-outline-dark btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
