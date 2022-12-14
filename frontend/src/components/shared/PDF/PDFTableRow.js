import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { INDENT_ENUM } from "../../ui/issue/issue.const";

const PDFTableRow = ({ data, isHeader = false, type = INDENT_ENUM.ISSUE }) => {
  const rowStyle = isHeader ? styles.th : styles.tr;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: isHeader ? 24 : 0,
        borderTop: isHeader ? "1px solid #000" : "none",
        borderRight: isHeader ? "1px solid #000" : "1px solid #ccc",
        borderLeft: isHeader ? "1px solid #000" : "1px solid #ccc",
        borderBottom: isHeader ? "1px solid #000" : "1px solid #ccc",
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
        <View style={{ width: "10%", ...rowStyle }}>
          <Text>{data?.pis?.name}</Text>
        </View>
      )}
      <View
        style={{
          width: type == INDENT_ENUM.ISSUE ? "15%" : "10%",
          ...rowStyle,
        }}
      >
        <Text>{data?.rs?.name}</Text>
      </View>

      <View
        style={{
          width: type == INDENT_ENUM.ISSUE ? "15%" : "10%",
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
    borderRight: "1px solid #000",
    height: "100%",
    padding: 6,
  },
});
