import React, { useState, useEffect } from "react";
import IssueForm from "./IssueForm";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncIssues } from "../../../redux/issueSlice";
import Grid from "../../shared/SharedHOCComponent/Grid";
import { colDefs } from "./issue.const";

export const IssueIndentsContainer = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.indents || []);
  const getIssues = () => {
    dispatch(getAsyncIssues(new Date(date).getTime()));
  };
  useEffect(() => {
    getIssues();
  }, []);

  const onSubmitHandler = () => {
    dispatch(getAsyncIssues(new Date(date).getTime()));
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

      <Grid columnDefs={colDefs} rowData={issues || []} />
    </div>
  );
};
