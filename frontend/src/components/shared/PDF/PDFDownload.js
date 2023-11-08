import axios from "axios";
import React, { useState, useEffect } from "react";
import { INDENT_ENUM } from "../../ui/issue/issue.const";
import { BASE_URL } from "../../../constants/AppConstant";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import PDFRow from "./PDFRow";
import PDFTableRow from "./PDFTableRow";
import * as moment from "moment";

const PDFDownloadDocument = ({
  selIndent,
  workorder,
  type = INDENT_ENUM.ISSUE,
  user,
  requestor,
  contractor,
  parentWorkorder,
  supervisor = "",
}) => {
  const transcationTimeStamp = selIndent?.history?.find(
    (his) => his.statusCode == 1
  )?.when;

  const [displayStocks, setDisplayStocks] = useState([]);
  useEffect(() => {
    getStocks().then((response) => {
      const rawStocks = response.data;
      let selStocks = selIndent?.requestedStocks;
      if (type == INDENT_ENUM.RETURN) {
        selStocks = selIndent?.returnStocks;
      }
      const editedStocks = selStocks?.map((stock) => {
        const rawStock = rawStocks.find((st) => st.id == stock.stockId);
        return {
          id: rawStock.id,
          name: rawStock.name,
          unit: rawStock.unit,
          code: rawStock.code,
          requestedQuantity:
            type == INDENT_ENUM.ISSUE
              ? stock.requestedQuantity
              : stock.returnQuantity,
          approvedQuantity:
            type == INDENT_ENUM.ISSUE
              ? stock.approvedQuantity || "0"
              : stock.acceptedQuantity || "0",
        };
      });

      setDisplayStocks(editedStocks);
    });
  }, [selIndent]);

  useEffect(() => {
    if (type == INDENT_ENUM.RETURN) {
      const editedStocks = displayStocks?.map((stock) => {
        return {
          ...stock,
          issueQuantity: workorder?.requestedStocks?.find(
            (_stock) => _stock.stockId == stock.id
          )?.approvedQuantity,
        };
      });

      setDisplayStocks(editedStocks);
    }
  }, [workorder, parentWorkorder, selIndent]);

  return (
    <Document>
      <Page style={{ padding: "24px", position: "relative" }}>
        <View
          style={{
            position: "absolute",
            transform: "rotate(-45) translate(-50%,-50%)",
            top: "50%",
            left: "50%",
            zIndex: 10000,
          }}
        >
          <Text
            style={{
              color: "rgba(0, 0, 0, .1)",
              fontSize: "72px",
              color: "red",
              zIndex: 10000,
            }}
          >
            {type == INDENT_ENUM.ISSUE ? "ISSUE" : "RETURN"}
          </Text>
        </View>
        <View style={{ textAlign: "center" }}>
          <Text style={{ fontSize: 20 }}>Asian Fab Tec Limited</Text>
        </View>
        {type == INDENT_ENUM.ISSUE && (
          <View style={{ textAlign: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 14 }}>{workorder?.project?.name}</Text>
          </View>
        )}

        {type == INDENT_ENUM.RETURN && (
          <View style={{ textAlign: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 14 }}>{selIndent?.indentNo}</Text>
          </View>
        )}
        {type == INDENT_ENUM.ISSUE && (
          <View style={{ textAlign: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "extrabold" }}>
              {selIndent?.indentNo}
            </Text>
          </View>
        )}

        <>
          <PDFRow
            leftLabel="Division"
            leftValue={
              type == INDENT_ENUM.RETURN
                ? parentWorkorder?.division?.name
                : workorder?.division?.name
            }
            rightLabel="Date"
            rightValue={moment(new Date(transcationTimeStamp)).format(
              "DD-MM-YYYY hh:mm:A"
            )}
          />

          <PDFRow
            leftLabel="Sub division"
            leftValue={
              type == INDENT_ENUM.RETURN
                ? parentWorkorder?.subdivision?.name
                : workorder?.subdivision?.name
            }
            rightLabel="Workorder"
            rightValue={
              type == INDENT_ENUM.RETURN
                ? parentWorkorder.displayName
                : workorder?.displayName
            }
          />

          <PDFRow
            leftLabel="Location"
            leftValue={
              type == INDENT_ENUM.RETURN
                ? workorder?.location
                : selIndent?.location
            }
            rightLabel="Vehicle"
            rightValue={selIndent?.vehicle}
          />
          <PDFRow
            leftLabel="Contractor"
            leftValue={contractor?.contractor}
            rightLabel="Firm"
            rightValue={contractor?.firm}
          />

          <PDFRow
            leftLabel="Site Supervisor"
            leftValue={supervisor?.name}
            rightLabel="Requestor"
            rightValue={requestor?.name}
          />
        </>

        {type == INDENT_ENUM.ISSUE && (
          <PDFTableRow
            isHeader={true}
            data={{
              no: {
                width: "5%",
                name: "Sl No",
              },
              name: {
                width: "30%",
                name: "Name",
              },
              code: {
                width: "10%",
                name: "Code",
              },
              unit: {
                width: "10%",
                name: "Unit",
              },
              rs: {
                width: "22%",
                name: "Requested Quantity",
              },
              is: {
                width: "22%",
                name: "Issued Quantity",
              },
            }}
          />
        )}

        {type == INDENT_ENUM.RETURN && (
          <PDFTableRow
            isHeader={true}
            type={type}
            data={{
              no: {
                width: "5%",
                name: "Sl No",
              },
              name: {
                width: "30%",
                name: "Materials",
              },
              code: {
                width: "10%",
                name: "Code",
              },
              unit: {
                width: "10%",
                name: "Unit",
              },
              pis: {
                width: "20%",
                name: "Issue Qty",
              },

              rs: {
                width: "20%",
                name: "Returned Qty",
              },
              is: {
                width: "15%",
                name: "Accepted Qty",
              },
            }}
          />
        )}

        {displayStocks &&
          displayStocks?.map((stockItem, index) => (
            <PDFTableRow
              key={stockItem.id}
              isHeader={false}
              type={type}
              alternateRow={index % 2 == 0 ? false : true}
              data={{
                no: {
                  width: "5%",
                  name: index + 1,
                },
                name: {
                  width: "30%",
                  name: stockItem.name,
                },
                code: {
                  width: "10%",
                  name: stockItem.code,
                },
                unit: {
                  width: "10%",
                  name: stockItem.unit,
                },
                rs: {
                  width: "30%",
                  name: stockItem.requestedQuantity,
                },
                is: {
                  width: "15%",
                  name: stockItem.approvedQuantity,
                },
                pis: {
                  width: "15%",
                  name: stockItem.issueQuantity,
                },
              }}
            />
          ))}
        <View style={{ position: "fixed", bottom: -40, textAlign: "right" }}>
          <Text style={{ fontSize: 12 }}>Signature</Text>
          <Text style={{ fontSize: 14 }}>{user}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDownloadDocument;

const getStocks = () => {
  const jwt = sessionStorage.getItem("auth_token");
  return axios.get(`${BASE_URL}/stocks`, {
    headers: {
      authorization: jwt,
    },
  });
};
