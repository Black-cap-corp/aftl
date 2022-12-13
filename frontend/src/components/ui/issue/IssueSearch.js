import React, { useState } from "react";
import { Form } from "react-bootstrap";

const IssueSearch = ({ onChange }) => {
  const [value, setValue] = useState("");
  return (
    <Form style={{ paddingTop: 24, paddingBottom: 24 }}>
      <Form.Control
        placeholder="Search Stocks"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Form>
  );
};

export default IssueSearch;
