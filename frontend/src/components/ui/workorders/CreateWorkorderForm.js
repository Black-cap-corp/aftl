import React, { useState, useEffect } from "react";
import BasicForm from "./BasicForm";
import StocksForm from "./StocksForm";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncProject } from "../../../redux/projectSlice";
import { getAsyncFirms } from "../../../redux/firmSlice";
import { getAsyncStocks } from "../../../redux/stockSlice";

const convertValuestoFormValue = (formData) => {
  const firstFormValue = {
    workorder: formData?.workorder || "",
    project: formData?.project?.id,
    division: formData?.division?.id,
    subdivision: formData?.subdivision?.id,
    status: formData?.status,
    displayName: formData?.displayName,
  };

  return firstFormValue;
};

const stocksValueFormvalue = (formData) => {
  const sel_stocks = formData?.stocks.reduce((agg, current) => {
    agg = { ...agg, [current.stockId]: current.stock };
    return agg;
  }, {});

  return sel_stocks;
};

const getSelFirms = (formData) => {
  const firms_d = formData?.contractors?.map((fir) => {
    return { id: fir.id, label: fir.firm };
  });
  return firms_d;
};

const CreateWorkorderForm = ({
  onSubmit,
  isEdit = false,
  formData,
  onEdit,
}) => {
  const [selContractors, setSelContractors] = useState(
    isEdit ? getSelFirms(formData) : []
  );
  const [firstFormValues, setFirstFormValues] = useState(
    isEdit ? convertValuestoFormValue(formData) : null
  );
  const [secondFormValues, setSecondFormValues] = useState(
    isEdit ? stocksValueFormvalue(formData) : null
  );
  const stocks = useSelector((state) => state.stocks);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.allProjects);
  const firms_data = useSelector((state) => state.firms);

  useEffect(() => {
    if (projects.length < 1) {
      dispatch(getAsyncProject());
    }
    if (firms_data.length < 1) {
      dispatch(getAsyncFirms());
    }
    if (stocks.length < 1) {
      dispatch(getAsyncStocks());
    }
  }, []);

  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      // console.log(values);
    }
  };

  const backBtnHandler = (values) => {
    setSecondFormValues(values);
    prevStep();
  };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onCreateWorkorder = (values) => {
    const stocks = [];
    for (let key in values) {
      if (values[key] && values[key] !== "" && values[key] > 0) {
        const stock = {
          stockId: key,
          stock: values[key],
        };
        stocks.push(stock);
      }
    }

    console.log(
      firms_data.filter((firm) => {
        console.log(firm.id);
        return selContractors.findIndex((sel) => sel.id === firm.id) > -1;
      })
    );
    const workorder = {
      workorder: firstFormValues.workorder,
      project: {
        id: firstFormValues.project,
        name: projects.find((project) => project.id === firstFormValues.project)
          .name,
      },
      division: {
        id: firstFormValues.division,
        name: projects
          .find((project) => project.id === firstFormValues.project)
          .divisions.find(
            (division) => division.id === firstFormValues.division
          ).name,
      },
      subdivision: {
        id: firstFormValues.subdivision,
        name: projects
          .find((project) => project.id === firstFormValues.project)
          .divisions.find(
            (division) => division.id === firstFormValues.division
          )
          .subdivisions.find(
            (subdiv) => subdiv.id === firstFormValues.subdivision
          ).name,
      },
      contractors: firms_data.filter(
        (firm) => selContractors.findIndex((sel) => sel.id === firm.id) > -1
      ),
      displayName: firstFormValues.displayName,
      status: firstFormValues.status,
      stocks: stocks,
    };

    onSubmit(workorder);
  };

  const onFirstPageSubmithandler = (values) => {
    setFirstFormValues(values);
    nextStep();
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{}}
    >
      <div className=" p-3 w-100 mt-5">
        {
          {
            1: (
              <BasicForm
                data={projects}
                firms_data={firms_data}
                onSubmithandler={onFirstPageSubmithandler}
                step={step}
                setSelContractors={setSelContractors}
                selContractors={selContractors}
                formValues={firstFormValues}
                isEdit={isEdit}
              />
            ),
            2: (
              <StocksForm
                stocks={stocks}
                step={step}
                onbackPresshander={backBtnHandler}
                formValues={secondFormValues}
                onSubmitHandler={onCreateWorkorder}
              />
            ),
          }[step]
        }
      </div>
    </div>
  );
};

export default CreateWorkorderForm;
