import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../shared/CustomInput";
import CustomSelect from "../../shared/CustomSelect";
import CustomButton from "../../shared/CustomButton";
import { StocksSchema } from "./StocksSchema";
import { stockUnitOptions } from "./Stocks.const";

const StocksForm = ({ handleSubmit, isEdit = false, formData }) => {
  const initialValues = !isEdit
    ? {
        name: "",
        code: "",
        unit: "No's",
      }
    : formData;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={StocksSchema}
    >
      {() => (
        <Form>
          <CustomInput
            label="Material Name"
            placeholder="Enter a name"
            name="name"
          />
          <CustomInput
            label="Material Code"
            placeholder="Enter the code"
            name="code"
          />
          <CustomSelect label="Unit" options={stockUnitOptions} name="unit" />
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

export default StocksForm;
