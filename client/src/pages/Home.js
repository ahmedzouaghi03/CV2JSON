import React, { useState } from "react";
import PdfUploader from "../components/PdfUploader";
import DisplayData from "../components/DisplayData";
import { extractText } from "../api/pdfApi";

const Home = () => {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setError("");

      const result = await extractText(file);

      
      setText(result.text);

    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      <PdfUploader onUpload={handleUpload} />

      {loading && <p className="mt-4">Extraction en cours...</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {text && <DisplayData data={text} />}

    </div>
  );
};

export default Home;
