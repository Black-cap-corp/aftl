import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={`navbar navbar-light bg-light ${styles.header}`}>
      <h1> Asian Fab tec</h1>
    </header>
  );
};

export default Header;
