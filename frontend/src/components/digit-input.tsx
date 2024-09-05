"use client"

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

const DigitInput = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictedDigit, setPredictedDigit] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image.");
      return;
    }

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

  const handleCancelImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="container mx-auto p-5 flex flex-col items-center justify-center space-y-6 bg-white rounded-lg shadow-md max-w-lg">
      <h2 className="font-bold text-2xl text-gray-800">Upload an Image</h2>
      <p className="text-sm text-gray-500">Select an image of a digit for prediction.</p>

      <Input 
        type="file" 
        onChange={handleFileChange} 
        className="w-full max-w-md cursor-pointer text-black file:cursor-pointer file:mr-4 file:px-4 file:border-0 file:text-sm file:text-blue-600"
      />

      {previewImage && (
        <div className="relative mt-4 flex flex-col items-center">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-48 h-48 object-cover rounded-lg shadow-lg mb-3 border border-gray-200"
          />
          <button
            type="button"
            onClick={handleCancelImage}
            className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 p-1 hover:bg-gray-300"
          >
            ✕
          </button>
          <p className="text-sm text-gray-500 mt-2">Preview of image</p>
        </div>
      )}

      <Button 
        onClick={handleSubmit} 
        variant="default" 
        size="lg" 
        className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white"
      >
        Predict Digit
      </Button>

      {predictedDigit !== null && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold text-gray-800">
            Predicted Digit: <span className="text-blue-600">{predictedDigit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DigitInput;
