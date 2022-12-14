import React, { useState, useEffect } from "react";
import IssueForm from "../issue/IssueForm";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../shared/SharedHOCComponent/Grid";
import { colDefs } from "./returns.const";
import { getAsyncReturns } from "../../../redux/returnsSlice";

const ReturnIndentsContainer = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();
  const returns = useSelector((state) => state.returns.indents || []);
  const getIssues = () => {
    dispatch(getAsyncReturns(new Date(date).getTime()));
  };
  useEffect(() => {
    getIssues();
  }, []);

  const onSubmitHandler = () => {
    dispatch(getAsyncReturns(new Date(date).getTime()));
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "32px",
        gap: 32,
      }}
    >
      <IssueForm
        date={date}
        setDate={setDate}
        onSubmitHandler={onSubmitHandler}
      />

      <Grid columnDefs={colDefs} rowData={returns || []} />
    </div>
  );
};

export default ReturnIndentsContainer;
