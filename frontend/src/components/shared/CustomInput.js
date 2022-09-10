import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Form.Group>
      <Form.Label>
        <span>{label}</span>
        {meta.error && meta.touched && (
          <span
            style={{ color: "red", marginLeft: 20, fontSize: 12 }}
            variant="danger"
            className="mt-1"
          >
            {meta.error}
          </span>
        )}
      </Form.Label>
      <Form.Control type="text" {...field} {...props}></Form.Control>
    </Form.Group>
  );
};

export default CustomInput;
