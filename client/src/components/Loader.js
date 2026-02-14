import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 animate-fadeIn">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-600 border-r-purple-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">
          Analyse en cours
        </p>
        <div className="flex space-x-1 justify-center">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${dot * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Extraction des données en cours...
        </p>
      </div>
    </div>
  );
};