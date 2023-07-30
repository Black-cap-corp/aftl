import React from "react";
import { Formik, Form } from "formik";
import CustomSelect from "../../shared/CustomSelect";
import { useEffect } from "react";
import { useState } from "react";
import CustomButton from "../../shared/CustomButton";
import axios from "axios";
import { BASE_URL } from "../../../constants/AppConstant";
import { saveAs } from "file-saver";

const DowloadReportForm = ({ workorder, setClose }) => {
  const initialValues = {
    contractor: "all",
  };

  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    const conts = workorder?.contractors.map((con) => {
      return {
        value: con._id,
        display: con.contractor,
      };
    });

    setContractors([{ value: "all", display: "All" }, ...conts]);
  }, []);

  const onSubmithandler = (values) => {
    const payload = { workorder, contractor: values.contractor };
    downloadAPI(payload).then((response) => {
      saveAs(response.data, `${workorder?.workorder}.xlsx`);
    });
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmithandler}>
      <Form
        style={{
          display: "flex",
          gap: 20,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <CustomSelect
          label="Contractor"
          options={contractors}
          name="contractor"
          style={{ minWidth: "30rem" }}
        />

        <CustomButton type="submit" label="Download" customClass="primary" />
      </Form>
    </Formik>
  );
};

const downloadAPI = (payload) => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.post(`${BASE_URL}/workorder/getReport`, payload, {
    headers: {
      authorization: jwt,
    },
    responseType: "blob",
  });
};

export default DowloadReportForm;
