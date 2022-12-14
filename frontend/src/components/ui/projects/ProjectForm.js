import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";

const ProjectForm = ({ handleSubmit, isEdit = false, formdata, type }) => {
  let initialValues = { name: "", ...(type == "divisions" && { code: "" }) };
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
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CustomInput
              style={{ width: "100%" }}
              name="name"
              placeholder="Enter the project name"
            />
            {type == "divisions" && (
              <CustomInput name="code" placeholder="Enter the Code" />
            )}
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
