import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { INDENT_ENUM } from "../../ui/issue/issue.const";

const PDFTableRow = ({
  data,
  isHeader = false,
  type = INDENT_ENUM.ISSUE,
  alternateRow = false,
}) => {
  const rowStyle = isHeader ? styles.th : styles.tr;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: isHeader ? 24 : 0,
        backgroundColor: isHeader
          ? "#72A0C1"
          : alternateRow
          ? "#F0F8FF"
          : "#fff",
        color: isHeader ? "#fff" : "000",
        borderTopLeftRadius: isHeader ? 12 : 0,
        borderTopRightRadius: isHeader ? 12 : 0,
        fontSize: 12,
      }}
    >
      <View style={{ width: data?.no?.width, ...rowStyle }}>
        <Text>{data?.no?.name}</Text>
      </View>
      <View style={{ width: data?.name?.width, ...rowStyle }}>
        <Text>{data?.name?.name}</Text>
      </View>
      <View style={{ width: data?.code?.width, ...rowStyle }}>
        <Text>{data?.code?.name}</Text>
      </View>

      <View style={{ width: data?.unit?.width, ...rowStyle }}>
        <Text>{data?.unit?.name}</Text>
      </View>
      {type == INDENT_ENUM.RETURN && (
        <View style={{ width: "15%", ...rowStyle }}>
          <Text>{data?.pis?.name}</Text>
        </View>
      )}
      <View
        style={{
          width: type == INDENT_ENUM.ISSUE ? "22%" : "15%",
          ...rowStyle,
        }}
      >
        <Text>{data?.rs?.name}</Text>
      </View>

      <View
        style={{
          width: type == INDENT_ENUM.ISSUE ? "22%" : "15%",
          ...rowStyle,
          border: "none",
        }}
      >
        <Text>{data?.is?.name}</Text>
      </View>
    </View>
  );
};

export default PDFTableRow;

const styles = StyleSheet.create({
  tr: {
    display: "flex",
    justifyContent: "center",
    borderRight: "1px solid #ccc",
    height: "100%",
    padding: 6,
  },
  th: {
    display: "flex",
    justifyContent: "center",
    borderRight: "1px solid #ccc",
    height: "100%",
    padding: 6,
  },
});
