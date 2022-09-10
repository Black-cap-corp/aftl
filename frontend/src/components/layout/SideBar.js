import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  // let [pageSelected, setPageSelected] = useState("");
  const location = useLocation();
  const pageSelected = location.pathname.split("/");

  console.log(pageSelected);

  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
      <hr></hr>
      <nav>
        <ul className={styles.navul}>
          <li className={pageSelected.includes("stocks") ? styles.active : ""}>
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
          </li>
        </ul>
      </nav>
      <div className={styles.footer}>
        <h4>Test User</h4>
      </div>
    </div>
  );
};

export default SideBar;
