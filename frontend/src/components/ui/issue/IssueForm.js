import React from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "../../shared/CustomButton";

const IssueForm = ({ date, setDate, onSubmitHandler }) => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Form.Control
        type="date"
        style={{ width: 300 }}
        name="datepic"
        placeholder="DateRange"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />

      <CustomButton label="Search" onClick={onSubmitHandler}></CustomButton>
    </div>
  );
};

export default IssueForm;
