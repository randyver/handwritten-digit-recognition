"use client"

import { useState } from 'react';

const DigitInput = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictedDigit, setPredictedDigit] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPredictedDigit(data.predicted_digit);
      console.log("Predicted digit:", data.predicted_digit);
    } catch (error) {
      console.error("Error predicting digit:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Predict Digit
      </button>
      {predictedDigit !== null && <p>Predicted Digit: {predictedDigit}</p>}
    </div>
  );
};

export default DigitInput;
