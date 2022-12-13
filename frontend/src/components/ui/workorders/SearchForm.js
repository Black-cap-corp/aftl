import { Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "../../shared/CustomSelect";
import CustomButton from "../../shared/CustomButton";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getAsyncWorkorder } from "../../../redux/workorderSlice";

const SearchForm = ({ data, showModel }) => {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState([
    { value: "", display: "Select a project" },
  ]);
  const [divisions, setDivisions] = useState([
    { value: "", display: "Select a division" },
  ]);
  const [subdivisions, setSubdivisions] = useState([
    { value: "", display: "Select a subdivision" },
  ]);

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

  const onSubmithandler = (values) => {
    const filter = {
      project: values["project"],
      division: values["division"],
      subdivision: values["subdivision"],
    };
    dispatch(getAsyncWorkorder(filter));
  };

  return (
    <div>
      <Formik
        initialValues={{ project: "", division: "", subdivision: "" }}
        validationSchema={searchFromSchema}
        onSubmit={onSubmithandler}
      >
        <Form
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 20,
          }}
        >
          <FormObserver onChange={handleChange} />
          <CustomSelect label="Project" options={projects} name="project" />
          <CustomSelect label="Division" options={divisions} name="division" />
          <CustomSelect
            label="Sub division"
            options={subdivisions}
            name="subdivision"
          />

          <CustomButton type="submit" label="Search" />
          <CustomButton
            label="Add Workorder"
            customClass="primary"
            onClick={(e) => {
              e.preventDefault();
              showModel(true);
            }}
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

const searchFromSchema = yup.object().shape({
  project: yup.string().required("Required"),
  division: yup.string().required("Required"),
  subdivision: yup.string().required("Required"),
});

export default SearchForm;
