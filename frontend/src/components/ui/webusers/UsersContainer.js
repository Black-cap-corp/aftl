import React, { useState } from "react";
import WebUsers from "./WebUsers";
import Nav from "react-bootstrap/Nav";
import AppUsers from "../appusers/AppUsers";

const UsersContainer = () => {
  const [checked, setChecked] = useState("1");

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Nav
          justify
          variant="tabs"
          defaultActiveKey="1"
          onSelect={(selected) => setChecked(selected)}
        >
          <Nav.Item>
            <Nav.Link eventKey="1">Web users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">App users</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div style={{ width: "100%", paddingTop: 32 }}>
        {checked === "1" ? <WebUsers /> : <AppUsers />}
      </div>
    </div>
  );
};

export default UsersContainer;
