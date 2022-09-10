import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";

const ProjectForm = ({ handleSubmit, isEdit = false, formdata }) => {
  let initialValues = { name: "" };
  if (isEdit) {
    initialValues.name = formdata.name;
  }
  return (
    <div style={{ paddingBottom: "24px" }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <CustomInput name="name" placeholder="Enter the project name" />
            <button className="custom-btn" type="submit">
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
