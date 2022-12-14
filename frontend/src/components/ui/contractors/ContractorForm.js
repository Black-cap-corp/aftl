import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import * as yup from "yup";

const ContractorForm = ({ handleSubmit, isEdit = false, formData }) => {
  const initialValues = !isEdit
    ? {
        firm: "",
        contractor: "",
        code: "",
      }
    : formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contractorSchema}
    >
      {() => (
        <Form>
          <CustomInput
            label="Firm Name"
            placeholder="Enter firm name"
            name="firm"
          />
          <CustomInput
            label="Contractor Name"
            placeholder="Enter Contractor Name"
            name="contractor"
          />
          <CustomInput
            label="Contractor Code"
            placeholder="Enter Contractor Code"
            name="code"
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

const contractorSchema = yup.object().shape({
  firm: yup.string().required("Required"),
  contractor: yup.string().required("Required"),
  code: yup.string().required("Required"),
});

export default ContractorForm;
