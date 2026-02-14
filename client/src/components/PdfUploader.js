import React, { useState, useCallback } from 'react';

export const PdfUploader = ({ onUploadStart, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert("Veuillez déposer un fichier PDF valide");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      alert("Le fichier ne doit pas dépasser 10 Mo");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Veuillez sélectionner un fichier PDF");
      return;
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
      }
    }, 200);

    onUploadStart();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUploadSuccess(file);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl p-8 border-2 border-dashed transition-all duration-300 transform ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-6 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full inline-block mb-4 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {isDragging ? "Déposez votre fichier ici" : "Glissez-déposez votre CV"}
          </h3>
          <p className="text-gray-500 text-sm mb-4">ou</p>
        </div>

        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          id="file-upload"
          className="hidden"
        />
        
        <label 
          htmlFor="file-upload"
          className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 mb-4"
        >
          Parcourir les fichiers
        </label>

        {file && (
          <div className="w-full max-w-md bg-blue-50 rounded-lg p-4 mb-4 animate-slideIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} Mo
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform  transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={!file}
        >
          Analyser le document
        </button>
      </form>
    </div>
  );
};