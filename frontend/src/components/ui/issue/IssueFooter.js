import React, { useEffect, useState } from "react";
import { INDENT_ENUM, OPERATOR_ENUM } from "./issue.const";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDownloadDocument from "../../shared/PDF/PDFDownload";

import CustomButton from "../../shared/CustomButton";

const IssueFooter = ({
  openModalHandler,
  user,
  selIndent,
  submitHandlerForApprover,
  workorder,
  type = INDENT_ENUM.ISSUE,
  contractor,
  identities = [],
  parentWorkorder,
}) => {
  const [identity, setIdentity] = useState({});
  useEffect(() => {
    const ide = identities?.find((id) => id._id == selIndent?.requestor);
    if (ide) {
      setIdentity(ide);
    }
  }, [identities]);
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "transparent",
        height: "100%",
        display: "flex",
        padding: 10,
        marginBottom: 10,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {user?.entitlement.includes("webApprover") && (
        <div>
          <CustomButton
            label="View Stocks"
            style={{
              borderColor: "#000",
              marginRight: 12,
              color: "#000",
              backgroundColor: "transparent",
            }}
            onClick={openModalHandler}
          />

          {selIndent.statusCode == 1 && (
            <>
              <CustomButton
                label="Reject Indent"
                style={{
                  borderColor: "red",
                  marginRight: 12,
                  color: "red",
                  backgroundColor: "transparent",
                }}
                onClick={() => submitHandlerForApprover(OPERATOR_ENUM.REJECT)}
              />
              <CustomButton
                label="Approve Indent"
                style={{
                  borderColor: "green",
                  color: "green",
                  backgroundColor: "transparent",
                }}
                onClick={() => submitHandlerForApprover(OPERATOR_ENUM.APPROVE)}
              />
            </>
          )}
        </div>
      )}
      {user?.entitlement.includes("webOperator") &&
        selIndent.statusCode == 2 &&
        selIndent.approved && (
          <CustomButton
            label="Update Indent"
            onClick={openModalHandler}
            style={{ marginRight: 12 }}
          />
        )}

      {user?.entitlement.includes("webOperator") &&
        selIndent.statusCode == 1 &&
        type == INDENT_ENUM.RETURN && (
          <CustomButton
            label="Update Return"
            onClick={openModalHandler}
            style={{ marginRight: 12 }}
          />
        )}

      {user?.entitlement.includes("webOperator") &&
        selIndent.approved == true && (
          <PDFDownloadLink
            style={{
              color: "#000",
              textDecoration: "none",
              border: "1px solid #000",
              borderRadius: 5,
              padding: "6px 12px",
            }}
            document={
              <PDFDownloadDocument
                selIndent={selIndent}
                workorder={workorder}
                user={user.name}
                contractor={contractor}
                type={INDENT_ENUM.ISSUE}
                identity={identity}
                parentWorkorder={null}
              />
            }
            fileName={`${selIndent.indentNo}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download"
            }
          </PDFDownloadLink>
        )}

      {user?.entitlement.includes("webOperator") &&
        type == INDENT_ENUM.RETURN && (
          <PDFDownloadLink
            style={{
              color: "#000",
              textDecoration: "none",
              border: "1px solid #000",
              borderRadius: 5,
              padding: "6px 12px",
            }}
            document={
              <PDFDownloadDocument
                selIndent={selIndent}
                workorder={workorder}
                user={user.name}
                type={INDENT_ENUM.RETURN}
                contractor={contractor}
                identity={identity}
                parentWorkorder={parentWorkorder}
              />
            }
            fileName={`${selIndent.indentNo}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download"
            }
          </PDFDownloadLink>
        )}
    </div>
  );
};

export default IssueFooter;
