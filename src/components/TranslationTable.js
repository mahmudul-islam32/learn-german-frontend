import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import PDFDocument from "./PDFDocument";
import Loader from "./Loader";

function TranslationTable({ translations, loading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const translationsPerPage = 10; // Number of translations per page

  // Function to calculate the total number of pages
  const totalPages = Math.ceil(translations.length / translationsPerPage);

  // Function to filter translations based on search query
  const filteredTranslations = translations.filter(
    (translation) =>
      translation.germanWord
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      translation.englishTranslations.some((word) =>
        word.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * translationsPerPage;
  const endIndex = startIndex + translationsPerPage;

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalTranslations = translations.length;

  // Sort translations alphabetically by German word
  const sortedTranslations = filteredTranslations
    .slice()
    .sort((a, b) => a.germanWord.localeCompare(b.germanWord));

  const currentTranslations = sortedTranslations.slice(startIndex, endIndex);

  if (loading) return <Loader />;

  return (
    <div className="col-md-8">
      <div className="items">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Display the total number of words */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>Total Words: {totalTranslations}</div>
          <button className="btn btn-primary pdf-button">
            <PDFDownloadLink
              document={<PDFDocument translations={sortedTranslations} />}
              fileName="translations.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download All Words"
              }
            </PDFDownloadLink>
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>German Words</th>
              <th>English Translations</th>
            </tr>
          </thead>
          <tbody>
            {/* Display translations for the current page */}

            {currentTranslations.length === 0 ? (
              <tr>
                <td colSpan="3">
                  <p>No matching translations found.</p>
                </td>
              </tr>
            ) : (
              currentTranslations.map((translation, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{translation.germanWord}</td>
                  <td>{translation.englishTranslations.join(", ")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination buttons */}
        {translations.length > 10 && (
          <div className="d-flex justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn btn-secondary ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TranslationTable;
