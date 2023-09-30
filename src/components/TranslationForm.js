import React, { useState } from 'react';

function TranslationForm({ onAddTranslation }) {
  const [germanWord, setGermanWord] = useState('');
  const [englishTranslations, setEnglishTranslations] = useState('');

  const handleAddTranslation = () => {
    // Remove leading and trailing whitespaces from the inputs
    const trimmedGermanWord = germanWord.trim();
    const trimmedEnglishTranslations = englishTranslations.trim();

    if (!trimmedGermanWord || !trimmedEnglishTranslations) {
      // If either field is empty after trimming, display an error
      alert('Both German Word and English Translations must be filled in.');
      return;
    }

    const translations = trimmedEnglishTranslations.split(',').map((translation) => translation.trim());

    onAddTranslation({ germanWord: trimmedGermanWord, englishTranslations: translations });
    setGermanWord('');
    setEnglishTranslations('');
  };

  return (
    <div className="col-md-4">
     <div className='input-form'>
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
      </div>
    </div>
  );
}

export default TranslationForm;
