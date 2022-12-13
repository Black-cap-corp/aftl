import React, { useContext } from "react";
import styles from "./Header.module.css";
import { UserContext } from "../../App";

const Header = () => {
  const user = useContext(UserContext);

  return (
    <header className={`navbar navbar-light bg-light ${styles.header}`}>
      <h2 style={{ fontWeight: "bolder" }}> Asian Fab tec</h2>
      {user && <h5>{user.name}</h5>}
    </header>
  );
};

export default Header;
