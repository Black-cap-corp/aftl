import React from "react";
import Form from "react-bootstrap/Form";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";

const MultiSelect = ({ label, options, onChange, selOptions }) => {
  return (
    <Form.Group className="" style={{ minWidth: "30rem", maxWidth: "30rem" }}>
      <Form.Label>
        <span>{label}</span>
        {selOptions?.length < 1 && (
          <span
            style={{ color: "red", marginLeft: 20, fontSize: 12 }}
            variant="danger"
            className="mt-1"
          >
            Required
          </span>
        )}
      </Form.Label>

      <Typeahead
        style={{ minWidth: "15rem" }}
        multiple
        id="test"
        onChange={onChange}
        options={options}
        defaultSelected={selOptions}
      />
    </Form.Group>
  );
};

export default MultiSelect;
