import React from "react";

export const Details = ({ label, value }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <p style={{ margin: 0, padding: 0 }}>{label}</p>
      <hr style={{ margin: 0 }} />
      <strong style={{ margin: 0, padding: 0 }}>{value}</strong>
    </div>
  );
};

const IssueTopHeader = ({ selIndent, workorder, type }) => {
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
      <Details label="Workorder" value={workorder?.indentNo} />
      <Details
        label="Requested For"
        value={new Date(selIndent?.neededFor).toDateString()}
      />
      <Details label="Location" value={selIndent?.location} />
      <Details label="Vehicle" value={selIndent?.vehicle} />
      <Details
        label="Approved"
        value={
          selIndent?.approved ? (
            <p style={{ color: "green" }}>Approved</p>
          ) : (
            <p style={{ color: "red" }}>Not Approved</p>
          )
        }
      />
    </div>
  );
};

export default IssueTopHeader;
