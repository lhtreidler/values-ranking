import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Value } from "../constants";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginTop: 15,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});

// Create Document Component
export const ValuesPdf = ({ values }: { values: Value[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Top 10 Values</Text>
        {values.map(({ name, description }, i) => (
          <Text key={i} style={styles.text}>
            {i + 1}. {name} - {description}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
