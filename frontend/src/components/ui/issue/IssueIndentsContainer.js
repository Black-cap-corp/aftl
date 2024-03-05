import React, { useState, useEffect, useContext } from "react";
import IssueForm from "./IssueForm";
import { useSelector, useDispatch } from "react-redux";
import {
  getAsyncIssues,
  getAsyncIssueswithDivision,
} from "../../../redux/issueSlice";
import Grid from "../../shared/SharedHOCComponent/Grid";
import { colDefs } from "./issue.const";
import { UserContext } from "../../../App";
import { FILTER_STORES } from "../../../constants/AppConstant";

export const IssueIndentsContainer = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.indents || []);
  const user = useContext(UserContext);

  const getIssues = () => {
    const uniqueStore = FILTER_STORES.find((store) => store.id === user._id);
    console.log(uniqueStore);
    if (uniqueStore) {
      console.log("unique store call");
      dispatch(
        getAsyncIssueswithDivision({
          date: new Date(date).getTime(),
          division: uniqueStore.divisionId,
        })
      );
    } else {
      console.log("normal call");
      dispatch(getAsyncIssues(new Date(date).getTime()));
    }
    // if (user._id === MANGALORE_STORE_ID) {
    //   dispatch(
    //     getAsyncIssueswithDivision({
    //       date: new Date(date).getTime(),
    //       division: MANGLORE_DIVISION,
    //     })
    //   );
    // } else {
    //   dispatch(getAsyncIssues(new Date(date).getTime()));
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

      <Grid columnDefs={colDefs} rowData={issues || []} />
    </div>
  );
};
