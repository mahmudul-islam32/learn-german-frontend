// PDFDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "30px 30px", // Add 30px padding to all sides (top, right, bottom, left)
  },
  table: {
    width: "100%",
    border: "1px solid #f5f5f5",
  },
  tableHeader: {
    backgroundColor: "#6cade2",
    color: "white",
    fontWeight: "bold",
    padding: 6,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f5f5f5",
  },
  tableCell: {
    padding: 6,
    fontSize: 12,
    flex: 1,
    borderRight: "1px solid #f5f5f5",
  },
});

const PDFDocument = ({ translations }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              { flex: 1, backgroundColor: "#6cade2", borderColor: "#6cade2" },
            ]}
          >
            #
          </Text>
          <Text
            style={[
              styles.tableCell,
              { flex: 2, backgroundColor: "#6cade2", borderColor: "#6cade2" },
            ]}
          >
            German Word
          </Text>
          <Text
            style={[
              styles.tableCell,
              { flex: 3, backgroundColor: "#6cade2", borderColor: "#6cade2" },
            ]}
          >
            English Translations
          </Text>
        </View>
        {/* Table Rows */}
        {translations.map((translation, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{index + 1}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {translation.germanWord}
            </Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>
              {translation.englishTranslations.join(", ")}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
