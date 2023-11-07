// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import TranslationForm from "./components/TranslationForm";
import TranslationTable from "./components/TranslationTable";

function App() {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://learn-german-server.onrender.com/translations")
      .then((response) => {
        setTranslations(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false); // Set loadingFetch back to false after the request completes or fails
      });
  }, []);

  const handleAddTranslation = (newTranslation) => {
    setLoading(true);
    axios
      .post(
        "https://learn-german-server.onrender.com/translations",
        newTranslation
      )
      .then((response) => {
        setTranslations([...translations, response.data]);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false); // Set loadingAdd back to false after the request completes or fails
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="logo-text">Learn German Words</h1>
        <TranslationForm onAddTranslation={handleAddTranslation} />
        <TranslationTable translations={translations} loading={loading} />
      </div>
    </div>
  );
}

export default App;
