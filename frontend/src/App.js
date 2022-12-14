import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import AppRoutes from "./Routes";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { createContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";

function App() {
  const alert = useAlert();

  const rateLimiter = (func, delay) => {
    let flag = true;
    return function (params) {
      if (flag) {
        func.call(this, params);
        flag = false;
      }
      setTimeout(() => {
        flag = true;
      }, delay);
    };
  };

  const successFunc = (text) => {
    alert.success(text);
  };

  const errorFunc = (text) => {
    alert.success(text);
  };

  const successDelay = rateLimiter(successFunc, 1000);
  const errorDelay = rateLimiter(errorFunc, 1000);

  axios.interceptors.request.use(
    (req) => {
      // Add configurations here
      successDelay("Data fetched successfully");
      return req;
    },
    (err) => {
      errorDelay("Fetching Data  failed");
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      // Add configurations here
      if (res.status === 201) {
        successDelay("Data saved successfully");
      }
      return res;
    },
    (err) => {
      errorDelay("data saving failed");

      return Promise.reject(err);
    }
  );

  let user = useSelector((state) => state.user);

  return (
    <>
      <UserContext.Provider value={user}>
        <Header></Header>
        <div className={styles.content}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

export const UserContext = createContext("");
