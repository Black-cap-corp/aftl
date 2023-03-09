import React from "react";
import { View, Text } from "@react-pdf/renderer";

const PDFRow = ({ leftLabel, leftValue, rightLabel, rightValue }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 10,
        borderBottom: "1px solid #ccc",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ color: "gray", marginRight: 10 }}>{leftLabel}</Text>
        <Text>{leftValue}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ color: "gray", marginRight: 10 }}>{rightLabel}</Text>
        <Text>{rightValue}</Text>
      </View>
    </View>
  );
};

export default PDFRow;
