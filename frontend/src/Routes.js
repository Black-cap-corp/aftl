import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { UserContext } from "./App";
import { useHttp } from "./customhooks/HttpCustomHook";
import { BASE_URL } from "./constants/AppConstant";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import Stocks from "./components/ui/stocks/Stocks";
import ProjectContainer from "./components/ui/projects/ProjectContainer";
import Contractor from "./components/ui/contractors/Contractor";
import WorkOrder from "./components/ui/workorders/WorkOrder";
import UsersContainer from "./components/ui/webusers/UsersContainer";
import { IssueIndentsContainer } from "./components/ui/issue/IssueIndentsContainer";
import ReturnIndentsContainer from "./components/ui/returns/ReturnIndentsContainer";
import IssueDetailsContainer from "./components/ui/issue/IssueDetailsContainer";
import ReturnIndentsDetailsContainer from "./components/ui/returns/ReturnIndentsDetailsContainer";

const AppRoutes = () => {
  const user = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          user ? (
            <HomePage />
          ) : (
            <ProtectRouteMemo>
              <HomePage />
            </ProtectRouteMemo>
          )
        }
      >
        <Route path="stocks" element={<Stocks />} />
        <Route path="projects" element={<ProjectContainer />} />
        <Route path="contractors" element={<Contractor />} />
        <Route path="workorders" element={<WorkOrder />} />
        <Route path="users" element={<UsersContainer />} />
        <Route path="issue" element={<IssueIndentsContainer />} />

        <Route path="issue-details/:id" element={<IssueDetailsContainer />} />
        <Route
          path="return-details/:id"
          element={<ReturnIndentsDetailsContainer />}
        />

        <Route path="returns" element={<ReturnIndentsContainer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

const ProtectRoute = ({ children }) => {
  const auth = sessionStorage.getItem("auth_token");

  const http = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successFn = (response) => {
    const user = response.data["name"];
    dispatch(setUser(user));
    return children;
  };

  const failureFn = (error) => {
    console.error(error.message);
    navigate("/login");
  };
  useEffect(() => {
    function getUserDetails() {
      if (auth) {
        const req = {
          method: "POST",
          body: { token: auth },
          url: `${BASE_URL}/login/verifyAuth`,
          successFn: successFn,
          failure: failureFn,
        };
        http(req);
      } else {
        navigate("/login");
      }
    }
    getUserDetails();
  }, [auth]);
};

const ProtectRouteMemo = React.memo(ProtectRoute);
