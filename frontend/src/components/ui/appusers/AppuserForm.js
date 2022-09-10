import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import * as yup from "yup";

const AppuserForm = ({ handleSubmit, isEdit = false, formData }) => {
  const initialValues = !isEdit
    ? {
        name: "",
        mobile: "",
        password: "",
      }
    : formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={appuserSchema}
    >
      {() => (
        <Form>
          <CustomInput label="Name" placeholder="Enter a name" name="name" />
          <CustomInput
            label="Password"
            placeholder="Password"
            name="password"
          />
          <CustomInput
            label="Mobile"
            placeholder="Mobile number"
            name="mobile"
            type="number"
          />
          <div style={{ textAlign: "right" }}>
            <CustomButton
              style={{ marginTop: 19 }}
              type="submit"
              label="Save"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AppuserForm;
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const appuserSchema = yup.object().shape({
  name: yup.string().required("Required"),
  password: yup.string().required("Required"),
  mobile: yup
    .string()
    .min(10, "Too short")
    .max(10, "Too lengthy")
    .required("Required"),
});
