import React, { useState } from 'react';

export const DisplayData = ({ title, data, type }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur de copie:', err);
    }
  };

  const formattedData = type === 'json' 
    ? JSON.stringify(data, null, 2)
    : data;

  const previewData = expanded 
    ? formattedData 
    : formattedData.slice(0, 500) + (formattedData.length > 500 ? '...' : '');

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 transform transition-all duration-300  hover:shadow-3xl">
      <div className="bg-gray-800/50 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-300 text-sm font-mono font-medium">{title}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-300"
          >
            {expanded ? 'Réduire' : 'Étendre'}
          </button>
          
          <button
            onClick={handleCopy}
            className="relative px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 flex items-center space-x-1 transform "
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copié!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="relative">
        <pre className="p-6 text-sm font-mono overflow-x-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <code className={`${type === 'json' ? 'text-green-400' : 'text-blue-400'}`}>
            {previewData}
          </code>
        </pre>
        
        {!expanded && formattedData.length > 500 && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
        )}
      </div>
      
      <div className="bg-gray-800/50 px-6 py-3 border-t border-gray-700">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Lignes: {formattedData.split('\n').length}</span>
          <span>Caractères: {formattedData.length}</span>
        </div>
      </div>
    </div>
  );
};