import React from "react";
import Form from "react-bootstrap/Form";
import { useField, Field } from "formik";

const CustomSelect = ({ label, disabled = false, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <Form.Group className="" style={{ minWidth: "15rem" }}>
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

      <Field
        as="select"
        {...field}
        {...props}
        className="form-control"
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.display}
          </option>
        ))}
      </Field>
    </Form.Group>
  );
};

export default CustomSelect;
