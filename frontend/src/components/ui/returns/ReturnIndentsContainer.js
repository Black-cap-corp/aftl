import React, { useState, useEffect, useContext } from "react";
import IssueForm from "../issue/IssueForm";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../shared/SharedHOCComponent/Grid";
import { colDefs } from "./returns.const";
import {
  getAsyncReturns,
  getAsyncReturnswithDivision,
} from "../../../redux/returnsSlice";
import { UserContext } from "../../../App";
import {
  MANGALORE_STORE_ID,
  MANGLORE_DIVISION,
} from "../../../constants/AppConstant";

const ReturnIndentsContainer = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();
  const returns = useSelector((state) => state.returns.indents || []);
  const user = useContext(UserContext);

  const getIssues = () => {
    if (user._id === MANGALORE_STORE_ID) {
      dispatch(
        getAsyncReturnswithDivision({
          date: new Date(date).getTime(),
          division: MANGLORE_DIVISION,
        })
      );
    } else {
      dispatch(getAsyncReturns(new Date(date).getTime()));
    }
  };
  useEffect(() => {
    getIssues();
  }, []);

  const onSubmitHandler = () => {
    getIssues();
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
