import React, { useState, useEffect } from "react";
import CustomSelect from "../../shared/CustomSelect";
import CustomButton from "../../shared/CustomButton";
import * as yup from "yup";
import { Form, Formik, useFormikContext } from "formik";
import { statusOptions } from "./workorder.const";
import CustomInput from "../../shared/CustomInput";
import MultiSelect from "../../shared/MultiSelect";

const BasicForm = ({
  data,
  firms_data,
  onSubmithandler,
  step,
  selContractors,
  setSelContractors,
  formValues,
  isEdit = false,
}) => {
  const [projects, setProjects] = useState([
    { value: "", display: "Select a project" },
  ]);

  const [initialValues, setInitialValues] = useState(() => {
    const init = {
      project: "",
      division: "",
      subdivision: "",
      workorder: "",
      status: "closed",
    };
    return formValues ? formValues : init;
  });

  const [firms, setFirms] = useState([]);
  const [divisions, setDivisions] = useState([
    { value: "", display: "Select a division" },
  ]);
  const [subdivisions, setSubdivisions] = useState([
    { value: "", display: "Select a subdivision" },
  ]);

  useEffect(() => {
    const firms_d = firms_data.map((fir) => {
      return { id: fir.id, label: fir.firm };
    });

    setFirms(firms_d);
  }, [firms_data]);

  useEffect(() => {
    const projects_data = data?.map((project) => {
      return { value: project.id, display: project.name };
    });
    setProjects([{ value: "", display: "Select a project" }, ...projects_data]);
  }, [data]);

  const handleChange = (values) => {
    if (values.project) {
      const divisions_data =
        data?.find((project) => project.id === values["project"])?.divisions ||
        [];
      const selectDivisions = divisions_data?.map((div) => {
        return { value: div.id, display: div.name };
      });

      setDivisions([
        { value: "", display: "Select a division" },
        ...selectDivisions,
      ]);
    } else {
      setDivisions([{ value: "", display: "Select a division" }]);
    }

    if (values.division) {
      const subdivisions_data =
        data
          ?.find((project) => project.id === values["project"])
          ?.divisions.find((division) => division.id === values["division"])
          ?.subdivisions || [];
      const selectSubdivisions = subdivisions_data?.map((subdiv) => {
        return { value: subdiv.id, display: subdiv.name };
      });

      setSubdivisions([
        { value: "", display: "Select a subdivision" },
        ...selectSubdivisions,
      ]);
    } else {
      setSubdivisions([[{ value: "", display: "Select a subdivision" }]]);
    }
  };
  const onChangeContractors = (selected) => {
    // Handle selections...
    setSelContractors(selected);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Basic Details</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmithandler}
        validationSchema={basicFormSchema}
      >
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
          <FormObserver onChange={handleChange} />
          <CustomInput
            label="Workorder NO"
            name="workorder"
            style={{ minWidth: "30rem" }}
          />
          <CustomSelect
            label="Project"
            options={projects}
            name="project"
            style={{ minWidth: "30rem" }}
            disabled={isEdit ? true : false}
          />
          <CustomSelect
            label="Division"
            options={divisions}
            name="division"
            style={{ minWidth: "30rem" }}
            disabled={isEdit ? true : false}
          />
          <CustomSelect
            label="Sub division"
            options={subdivisions}
            name="subdivision"
            style={{ minWidth: "30rem" }}
            disabled={isEdit ? true : false}
          />
          <MultiSelect
            options={firms}
            label="Contractors"
            name="contractor"
            onChange={onChangeContractors}
            selOptions={selContractors}
          />
          <CustomSelect
            label="Status"
            options={statusOptions}
            name="status"
            style={{ minWidth: "30rem" }}
          />

          <CustomButton
            type="submit"
            label={step === 2 ? "Submit" : "Next"}
            customClass="primary"
          />
        </Form>
      </Formik>
    </div>
  );
};

const FormObserver = ({ onChange }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    onChange(values);
  }, [values]);
  return null;
};

const basicFormSchema = yup.object().shape({
  workorder: yup.string(),
  division: yup.string().required("Required"),
  subdivision: yup.string().required("Required"),
  status: yup.string().required("Required"),
  project: yup.string().required("Required"),
});

export default BasicForm;
