import React from "react";
import { Details } from "../issue/IssueTopHeader";

const ReturnTopHeader = ({ selIndent, parentIndent }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px 40px",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Details label="Indent No" value={selIndent?.indentNo} />
      <Details label="Issue No" value={parentIndent?.indentNo} />
      <Details label="Vehicle" value={selIndent?.vehicle} />
    </div>
  );
};

export default ReturnTopHeader;
