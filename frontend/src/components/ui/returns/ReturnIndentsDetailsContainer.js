import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/AppConstant";
import IssueFooter from "../issue/IssueFooter";
import IssueVerticalTimeline from "../issue/IssueVerticalTimeline";
import ModalPopup from "../../shared/ModalPopup";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import IssueEditForm from "../issue/IssueEditForm";
import {
  setSelectedReturnIndent,
  updateSelectedReturnIndent,
} from "../../../redux/returnsSlice";
import { INDENT_ENUM } from "../issue/issue.const";
import ReturnTopHeader from "./ReturnTopHeader";

const ReturnIndentsDetailsContainer = () => {
  const params = useParams();
  const user = useContext(UserContext);

  const dispatch = useDispatch();
  const selIndent = useSelector((state) => state.returns.selIndent);
  const [parentIndent, setParentIndent] = useState(null);

  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [stocks, setStocks] = useState([]);
  const [editable, setEditable] = useState(false);
  const [workorderDetails, setWorkorderDetails] = useState("");

  const [operationType, setOperationType] = useState("");
  const [contractor, setContractor] = useState("");
  const [ids, setIds] = useState([]);

  useEffect(() => {
    dispatch(setSelectedReturnIndent(params.id));
  }, []);

  useEffect(() => {
    if (parentIndent) {
      getWorkorderDetails(parentIndent.workorder).then((res) => {
        setWorkorderDetails(res.data);
      });
      getContractor(parentIndent.contractor).then((res) => {
        setContractor(res.data);
      });
    }
  }, [parentIndent]);

  useEffect(() => {
    console.log(workorderDetails);
  }, [workorderDetails]);

  useEffect(() => {
    if (selIndent) {
      getIndentDetails(selIndent?.indentId).then((indent) => {
        setParentIndent(indent.data);
      });
      const ids = selIndent.history.reduce(
        (ids, currentItem) => {
          if (currentItem.statusCode == 1) {
            ids = {
              ...ids,
              mobile: [...ids.mobile, currentItem.who],
            };
          } else {
            ids = {
              ...ids,
              app: [...ids.app, currentItem.who],
            };
          }
          return ids;
        },
        { app: [], mobile: [] }
      );

      getIdentities(ids).then(
        (res) => {
          const identities = res.data;
          setIds(identities);

          const formattedHistory = selIndent.history.map((his) => {
            return {
              who: identities?.find((ide) => ide?._id == his.who)?.name,
              when: new Date(his.when).toDateString(),
              description: his.description,
            };
          });

          setHistory(formattedHistory);
        },
        (error) => console.log("error")
      );
      setOperationType(
        selIndent.type == 0 ? INDENT_ENUM.ISSUE : INDENT_ENUM.RETURN
      );
    }
  }, [selIndent]);

  const openModalHandler = () => {
    getStocks().then((response) => {
      const rawStocks = response.data;
      const selStocks = selIndent?.returnStocks;
      const editedStocks = selStocks?.map((stock) => {
        const rawStock = rawStocks.find((st) => st.id == stock.stockId);
        return {
          id: rawStock.id,
          name: rawStock.name,
          unit: rawStock.unit,
          code: rawStock.code,
          requestedQuantity: stock.returnQuantity,
          approvedQuantity: stock.acceptedQuantity || "0",
        };
      });

      if (selIndent.statusCode == 1 || user._id == "63faed1228744eb30e2e6fe1") {
        setEditable(true);
      }

      setStocks(editedStocks);
      setShow(true);
    });
  };

  const submitHandler = (values) => {
    const keys = Object.keys(values);
    const editedStocks = keys.map((key) => {
      return {
        stockId: key,
        quantity: values[key] == "" ? 0 : Number(values[key]),
      };
    });
    const request = {
      indentId: selIndent._id,
      updatedBy: user._id,
      stocks: editedStocks,
      type: "operator",
    };

    dispatch(updateSelectedReturnIndent(request));
    setShow(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "25%" }}>
        <ReturnTopHeader
          selIndent={selIndent}
          parentIndent={parentIndent}
          type={operationType}
        />
      </div>
      <div style={{ height: "60%", overflowY: "scroll" }}>
        <IssueVerticalTimeline history={history} />
      </div>
      <div style={{ height: "15%" }}>
        <IssueFooter
          openModalHandler={openModalHandler}
          showApproverBtns={false}
          user={user}
          selIndent={selIndent || {}}
          workorder={parentIndent || {}}
          submitHandlerForApprover={{}}
          type={INDENT_ENUM.RETURN}
          contractor={contractor}
          identities={ids}
          parentWorkorder={workorderDetails}
        />
      </div>
      <ModalPopup
        body={
          <IssueEditForm
            stocks={stocks}
            submitHandler={submitHandler}
            statusCode={selIndent?.statusCode}
            user={user}
            editable={editable}
          />
        }
        handleHide={handleClose}
        header="Issue Quantity"
        show={show}
      />
    </div>
  );
};

const getIndentDetails = (id) => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.post(
    `${BASE_URL}/indent/getIndentDetails`,
    { id },
    {
      headers: {
        authorization: jwt,
      },
    }
  );
};

const getWorkorderDetails = (id) => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.post(
    `${BASE_URL}/workorder/getWorkorderDetails`,
    { id },
    {
      headers: {
        authorization: jwt,
      },
    }
  );
};
const getIdentities = (ids) => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.post(
    `${BASE_URL}/user/getIdentities`,
    { ids },
    {
      headers: {
        authorization: jwt,
      },
    }
  );
};

const getContractor = (id) => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.post(
    `${BASE_URL}/firm/getContractor`,
    { id },
    {
      headers: {
        authorization: jwt,
      },
    }
  );
};

const getStocks = () => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.get(`${BASE_URL}/stocks`, {
    headers: {
      authorization: jwt,
    },
  });
};

export default ReturnIndentsDetailsContainer;
