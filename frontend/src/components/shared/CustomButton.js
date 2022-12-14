import React from "react";
import "./CustomButton.css";

const CustomButton = ({ label, customClass = "", ...props }) => {
  return (
    <button
      className={`custom-btn ${customClass} ${
        props.disabled ? "disabled" : ""
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
