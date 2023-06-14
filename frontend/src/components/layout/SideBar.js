import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";
import {
  ADMIN_SIDEBAR_MENU,
  OPERATOR_SIDEBAR_MENU,
  WEB_READY_ONLY
} from "../../constants/sidebar.constant";
import { UserContext } from "../../App";
import { AiOutlineLogin } from "react-icons/ai";
import ConfirmPopup from "../shared/ConfirmPopup";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const pageSelected = location.pathname.split("/");
  const user = useContext(UserContext);
  console.log(user);
  const menuList = user.entitlement.includes("webAdminBoth")
    ? ADMIN_SIDEBAR_MENU
    : user.entitlement.includes("webAdminRead")? WEB_READY_ONLY : OPERATOR_SIDEBAR_MENU;

  const [showConfirm, setShowConfirm] = useState(false);
  const clickHandler = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleSubmitForLogout = () => {
    sessionStorage.setItem("auth_token", "");
    sessionStorage.setItem("user", "");
    navigate("/login");
    setShowConfirm(false);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
      <hr></hr>
      <nav>
        <ul className={styles.navul}>
          {menuList.map((menu) => (
            <li
              key={menu.name}
              className={
                pageSelected.includes(menu.name) ||
                pageSelected.includes(menu.secondName)
                  ? styles.active
                  : ""
              }
            >
              <Link to={menu.link}>{menu.label}</Link>
            </li>
          ))}
          {/* <li className={pageSelected.includes("stocks") ? styles.active : ""}>
            <Link to="/home/stocks">Stocks</Link>
          </li>
          <li
            className={pageSelected.includes("projects") ? styles.active : ""}
          >
            <Link to="/home/projects">Projects</Link>
          </li>
          <li
            className={
              pageSelected.includes("contractors") ? styles.active : ""
            }
          >
            <Link to="/home/contractors">Contractors</Link>
          </li>
          <li
            className={pageSelected.includes("workorders") ? styles.active : ""}
          >
            <Link to="/home/workorders">Work orders</Link>
          </li>
          <li
            className={pageSelected.includes("webusers") ? styles.active : ""}
          >
            <Link to="/home/webusers">Web users</Link>
          </li> */}
        </ul>
      </nav>
      <div className={styles.footer} style={{ cursor: "pointer" }}>
        <h5 onClick={clickHandler}>
          Logout <AiOutlineLogin />
        </h5>
      </div>

      <ConfirmPopup
        body="Are you sure , you want to logout"
        handleHide={handleCloseConfirm}
        header="Logout"
        onConfirm={handleSubmitForLogout}
        show={showConfirm}
      />
    </div>
  );
};

export default SideBar;
