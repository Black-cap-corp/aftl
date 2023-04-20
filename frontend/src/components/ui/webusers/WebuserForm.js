import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";
import CustomSelect from "../../shared/CustomSelect";
import CustomButton from "../../shared/CustomButton";
import * as yup from "yup";
import { webuserTypeOptions, webuserEntitlementOptions } from "./webuser.const";

const WebuserForm = ({ handleSubmit, isEdit = false, formData }) => {
  const initialValues = !isEdit
    ? {
        name: "",
        password: "",
        type: "operator",
        entitlement: "read",
      }
    : formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={!isEdit? webuserSchema: null}
    >
      {({ values }) => (
        <Form>
          <CustomInput label="Name" placeholder="Enter a name" name="name" />
          <CustomInput
            label="Password"
            placeholder="Password"
            name="password"
          />
          <CustomSelect label="Unit" options={webuserTypeOptions} name="type" />
          {values.type == "admin" && (
            <CustomSelect
              label="Entitlement"
              options={webuserEntitlementOptions}
              name="entitlement"
            />
          )}
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

export default WebuserForm;

const webuserSchema = yup.object().shape({
  name: yup.string().required("Required"),
  password: yup.string().required("Required"),
  type: yup.string().required("Required"),
  entitlement: yup.string().required("Required"),
});
