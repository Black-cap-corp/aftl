import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";
import { useState } from "react";
import { useEffect } from "react";

const ProjectForm = ({ handleSubmit, isEdit = false, formdata, type }) => {
  let initialValues = { name: "", ...(type == "divisions" && { code: "" }) };
  if (isEdit) {
    initialValues.name = formdata.name;
  }
  const [placeholder, setPlaceHolder] = useState(getPlaceholder(type));
  useEffect(() => {
    setPlaceHolder(getPlaceholder(type));
  }, [type]);
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
              placeholder={placeholder}
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

const getPlaceholder = (type) => {
  switch (type) {
    case "projects":
      return "Enter the Project name";
    case "divisions":
      return "Enter the Division name";
    case "subdivisions":
      return "Enter the Sub division name";
    default:
      return "";
  }
};

export default ProjectForm;
