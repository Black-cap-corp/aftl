import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setSelectedIndent,
  updateSelectedIndent,
} from "../../../redux/issueSlice";
import axios from "axios";
import { BASE_URL } from "../../../constants/AppConstant";
import IssueTopHeader from "./IssueTopHeader";
import IssueVerticalTimeline from "./IssueVerticalTimeline";
import IssueFooter from "./IssueFooter";
import ModalPopup from "../../shared/ModalPopup";
import IssueEditForm from "./IssueEditForm";
import { UserContext } from "../../../App";
import ConfirmPopup from "../../shared/ConfirmPopup";
import { OPERATOR_ENUM } from "./issue.const";

const IssueDetailsContainer = () => {
  const params = useParams();
  const user = useContext(UserContext);

  const dispatch = useDispatch();
  const selIndent = useSelector((state) => state.issues.selIndent);
  const [workorder, setWorkorderDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [stocks, setStocks] = useState([]);
  const [editable, setEditable] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [operationType, setOperationType] = useState("");
  const [btnVariant, setBtnVariant] = useState("");
  const [primaryBtnText, setPrimaryBtnText] = useState("");
  const [contractor, setContractor] = useState("");
  const [ids, setIds] = useState([]);

  const handleCloseConfirm = () => setShowConfirm(false);

  useEffect(() => {
    dispatch(setSelectedIndent(params.id));
  }, []);

  useEffect(() => {
    if (selIndent) {
      getWorkorderDetails(selIndent.workorder).then((workorder) => {
        setWorkorderDetails(workorder.data);
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
      ids.mobile.push(selIndent.supervisor || "");
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

      getContractor(selIndent.contractor).then((res) => {
        setContractor(res.data);
      });
    }
  }, [selIndent]);

  const openModalHandler = () => {
    getStocks().then((response) => {
      const rawStocks = response.data;
      const selStocks = selIndent?.requestedStocks;
      const editedStocks = selStocks?.map((stock) => {
        const rawStock = rawStocks.find((st) => st.id == stock.stockId);
        return {
          id: rawStock.id,
          name: rawStock.name,
          unit: rawStock.unit,
          code: rawStock.code,
          requestedQuantity: stock.requestedQuantity,
          approvedQuantity: stock.approvedQuantity || "0",
        };
      });

      const entitlement = user.entitlement;

      switch (true) {
        case entitlement.includes("webApprover"):
          setEditable(false);
          break;

        case entitlement.includes("webOperator") &&
          selIndent.approved &&
          selIndent.statusCode == 2:
          setEditable(true);
          break;
        case entitlement.includes("webOperator") &&
          selIndent.approved &&
          user._id == "63faed1228744eb30e2e6fe1":
          setEditable(true);
          break;

        default:
          setEditable(false);
      }

      setStocks(editedStocks);
      setShow(true);
    });
  };

  const submitHandlerForApprover = (operationType) => {
    setOperationType(operationType);
    switch (operationType) {
      case OPERATOR_ENUM.APPROVE:
        setHeader("Approve");
        setBody("Are you sure, you want to approve ?");
        setBtnVariant("primary");
        setPrimaryBtnText("Approve");
        break;
      case OPERATOR_ENUM.REJECT:
        setHeader("Reject");
        setBody("Are you sure, you want to reject ?");
        setBtnVariant("danger");
        setPrimaryBtnText("Reject");
        break;
      default:
    }

    setShowConfirm(true);
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

    dispatch(updateSelectedIndent(request));
    setShow(false);
  };

  const confirmPopActionHandler = () => {
    const request = {
      indentId: selIndent._id,
      updatedBy: user._id,
      approved: operationType == OPERATOR_ENUM.APPROVE ? true : false,
      type: "approver",
    };
    dispatch(updateSelectedIndent(request));
    setShowConfirm(false);
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
        <IssueTopHeader selIndent={selIndent} workorder={workorder} />
      </div>
      <div style={{ height: "60%", overflowY: "scroll" }}>
        <IssueVerticalTimeline history={history} />
      </div>
      <div style={{ height: "15%" }}>
        <IssueFooter
          openModalHandler={openModalHandler}
          showApproverBtns={selIndent?.statusCode == 2}
          user={user}
          selIndent={selIndent || {}}
          workorder={workorder}
          contractor={contractor}
          identities={ids}
          submitHandlerForApprover={submitHandlerForApprover}
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
      <ConfirmPopup
        body={body}
        handleHide={handleCloseConfirm}
        header={header}
        onConfirm={confirmPopActionHandler}
        show={showConfirm}
        btnVariant={btnVariant}
        primaryBtnText={primaryBtnText}
      />
    </div>
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

export default IssueDetailsContainer;
