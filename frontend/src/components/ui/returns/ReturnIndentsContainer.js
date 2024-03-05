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
import { FILTER_STORES } from "../../../constants/AppConstant";

const ReturnIndentsContainer = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();
  const returns = useSelector((state) => state.returns.indents || []);
  const user = useContext(UserContext);

  const getIssues = () => {
    const uniqueStore = FILTER_STORES.find((store) => store.id === user._id);
    console.log(uniqueStore);
    if (uniqueStore) {
      console.log("unique store call");
      dispatch(
        getAsyncReturnswithDivision({
          date: new Date(date).getTime(),
          division: uniqueStore.divisionId,
        })
      );
    } else {
      console.log("normal call");
      dispatch(getAsyncReturns(new Date(date).getTime()));
    }
    // if (user._id === MANGALORE_STORE_ID) {
    //   dispatch(
    //     getAsyncReturnswithDivision({
    //       date: new Date(date).getTime(),
    //       division: MANGLORE_DIVISION,
    //     })
    //   );
    // } else {
    //   dispatch(getAsyncReturns(new Date(date).getTime()));
    // }
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
