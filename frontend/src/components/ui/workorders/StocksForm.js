import { Formik } from "formik";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import * as yup from "yup";
import Table from "react-bootstrap/Table";
import CustomButton from "../../shared/CustomButton";
import IssueSearch from "../issue/IssueSearch";

const StocksForm = ({
  stocks,
  step,
  onbackPresshander,
  formValues,
  onSubmitHandler,
}) => {
  const validationSchema = yup.object().shape(getValidationSchema(stocks));
  const initialValues = stocks.reduce((agg, stock) => {
    agg = { ...agg, [stock.id]: "" };
    return agg;
  }, {});
  console.log({ ...initialValues, ...formValues });
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const onSearch = (key) => {
    if (key === "") {
      setFilteredStocks(stocks);
    } else {
      const fil = stocks.filter((stock) =>
        stock.name.toLowerCase().includes(key.toLowerCase())
      );
      setFilteredStocks(fil);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Stocks </h2>
      <div>
        <IssueSearch onChange={onSearch} />
      </div>
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        initialValues={
          formValues ? { ...initialValues, ...formValues } : initialValues
        }
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <form onSubmit={handleSubmit}>
            <Table>
              <thead>
                <tr>
                  <th>
                    <h5>#</h5>
                  </th>
                  <th>
                    <h5>Name</h5>
                  </th>
                  <th>
                    <h5>Material Code</h5>
                  </th>
                  <th>
                    <h5>Unit</h5>
                  </th>
                  <th>
                    <h5>Quantity</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks &&
                  filteredStocks.map((stock, index) => (
                    <tr key={stock.id}>
                      <td>{index + 1}</td>
                      <td>{stock.name}</td>
                      <td>{stock.code}</td>
                      <td>{stock.unit}</td>

                      <td>
                        <Form.Control
                          type="number"
                          name={stock.id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[stock.id]}
                          style={{ width: "10rem" }}
                        ></Form.Control>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div
              className="d-flex  px-5 mt-5"
              style={{ justifyContent: "flex-end", gap: 20 }}
            >
              <CustomButton
                label="back"
                onClick={(e) => {
                  onbackPresshander(values);
                }}
              />

              <CustomButton
                type="submit"
                label={step === 2 ? "Submit" : "Next"}
                customClass="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitHandler(values);
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StocksForm;

function getValidationSchema(stocks) {
  return stocks.reduce((agg, stock) => {
    agg = { ...agg, [`${stock.id}`]: yup.number().typeError("Enter Number") };
    return agg;
  }, {});
}
