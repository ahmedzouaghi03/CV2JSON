import React from "react";

const DisplayData = ({ data }) => {
  return (
    <div className="border p-4 rounded bg-gray-100 mt-6">
      <h3 className="font-bold mb-2">Texte extrait :</h3>

      <pre className="bg-black text-green-400 p-4 overflow-x-auto">
        {data}
      </pre>
    </div>
  );
};

export default DisplayData;
