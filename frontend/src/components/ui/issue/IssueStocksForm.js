import React from "react";
import Table from "react-bootstrap/Table";
import CustomButton from "../../shared/CustomButton";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";

const IssueStocksForm = ({
  stocks,
  onSubmitHandler,
  user,
  statusCode,
  editable = false,
}) => {
  const validationSchema = yup.object().shape(getValidationSchema(stocks));
  const initialValues = stocks.reduce((agg, stock) => {
    agg = { ...agg, [stock.id]: statusCode == 2 ? stock.approvedQuantity : "" };
    return agg;
  }, {});

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors, touched, isValid }) => (
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
                    <h5>Requested Quantity</h5>
                  </th>
                  <th>
                    <h5>Issued Quantity</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stocks &&
                  stocks.map((stock, index) => (
                    <tr key={stock.id}>
                      <td>{index + 1}</td>
                      <td>{stock.name}</td>
                      <td>{stock.code}</td>
                      <td>{stock.unit}</td>
                      <td>{stock.requestedQuantity}</td>
                      {!editable && <td>{stock.approvedQuantity || 0}</td>}
                      {editable && (
                        <td>
                          <Form.Control
                            type="number"
                            name={stock.id}
                            max={String(stock.requestedQuantity)}
                            onChange={handleChange}
                            value={values[stock.id]}
                            style={{ width: "10rem" }}
                          ></Form.Control>
                          {values[stock.id] > stock.requestedQuantity && (
                            <p style={{ color: "red", fontSize: 12 }}>
                              Max quantity can't exceed requested quantity
                            </p>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div
              className="d-flex  px-5 mt-5"
              style={{ justifyContent: "flex-end", gap: 20 }}
            >
              {editable && (
                <CustomButton
                  disabled={!isValid}
                  type="submit"
                  label="Submit"
                  customClass="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitHandler(values);
                  }}
                />
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
function getValidationSchema(stocks) {
  return stocks.reduce((agg, stock) => {
    agg = {
      ...agg,
      [`${stock.id}`]: yup
        .number()
        .max(stock.requestedQuantity, "Max reached")
        .typeError("Enter Number"),
    };
    return agg;
  }, {});
}
export default IssueStocksForm;
