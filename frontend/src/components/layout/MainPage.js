import React, { useState } from "react";
import SideBar from "./SideBar";
import styles from "./MainPage.module.css";
import { Outlet } from "react-router-dom";
import ConfirmPopup from "../shared/ConfirmPopup";

const MainPage = () => {
  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
