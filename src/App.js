// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import TranslationForm from "./components/TranslationForm";
import TranslationTable from "./components/TranslationTable";

function App() {
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/translations")
      .then((response) => setTranslations(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddTranslation = (newTranslation) => {
    axios
      .post("http://localhost:3001/translations", newTranslation)
      .then((response) => setTranslations([...translations, response.data]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1>Translation App</h1>
      <div className="row">
        <TranslationForm onAddTranslation={handleAddTranslation} />
        <TranslationTable translations={translations} />
      </div>
    </div>
  );
}

export default App;
