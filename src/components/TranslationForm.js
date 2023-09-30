import React, { useState } from "react";

function TranslationForm({ onAddTranslation }) {
  const [germanWord, setGermanWord] = useState("");
  const [englishTranslations, setEnglishTranslations] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddTranslation = () => {
    // Remove leading and trailing whitespaces from the inputs
    const trimmedGermanWord = germanWord.trim();
    const trimmedEnglishTranslations = englishTranslations.trim();

    if (!trimmedGermanWord || !trimmedEnglishTranslations) {
      // If either field is empty after trimming, display an error
      alert("Both German Word and English Translation must be filled in.");
      return;
    }

    const translations = trimmedEnglishTranslations
      .split(",")
      .map((translation) => translation.trim());

    // Call the onAddTranslation callback and handle success
    onAddTranslation({
      germanWord: trimmedGermanWord,
      englishTranslations: translations,
    });

    // Clear the input fields
    setGermanWord("");
    setEnglishTranslations("");

    // Set the success message
    setSuccessMessage("Words added successfully!");

    // Clear the success message after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="col-md-4">
      <div className="input-form">
        <div className="form-group">
          <label htmlFor="germanWord">German Word</label>
          <input
            type="text"
            className="form-control"
            id="germanWord"
            value={germanWord}
            onChange={(e) => setGermanWord(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="englishTranslations">English Translation</label>
          <input
            type="text"
            className="form-control"
            id="englishTranslations"
            value={englishTranslations}
            onChange={(e) => setEnglishTranslations(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddTranslation}>
          Add Translation
        </button>
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default TranslationForm;
