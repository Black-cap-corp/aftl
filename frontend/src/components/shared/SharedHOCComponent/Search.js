import React, { useEffect, useImperativeHandle, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import ModalPopup from "../ModalPopup";

const Search = ({ setShow, searchFn }) => {
  const initialValues = {
    search: "",
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={searchFn}>
        <Form
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <CustomInput
            label=""
            name="search"
            placeholder="Enter search Value"
          />
          <CustomButton label="Search" type="submit" />
          <CustomButton
            label="Add"
            customClass="primary"
            onClick={() => setShow(true)}
          />
        </Form>
      </Formik>
    </>
  );
};

const FormObserver = ({ callFn, filter }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    console.log(callFn);
    console.log(values[filter]);
    callFn(values[filter]);
  }, [values]);
  return null;
};

export default Search;
