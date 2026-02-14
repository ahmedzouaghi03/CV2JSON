import React, { useState } from 'react';
import { PdfUploader } from '../components/PdfUploader';
import { Loader } from '../components/Loader';
import { DisplayData } from '../components/DisplayData';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleProcess = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults({
        json: { 
          personalInfo: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+33 6 12 34 56 78",
            location: "Paris, France"
          },
          skills: ["React", "Node.js", "TypeScript", "UI/UX Design"],
          experience: [
            { company: "Tech Corp", role: "Senior Developer", years: 3 },
            { company: "Startup Inc", role: "Full Stack", years: 2 }
          ],
          education: {
            degree: "Master en Informatique",
            school: "Université de Paris",
            year: 2018
          }
        },
        xml: `<?xml version="1.0" encoding="UTF-8"?>
<cv>
  <personalInfo>
    <name>John Doe</name>
    <email>john@example.com</email>
    <phone>+33 6 12 34 56 78</phone>
    <location>Paris, France</location>
  </personalInfo>
  <skills>
    <skill>React</skill>
    <skill>Node.js</skill>
    <skill>TypeScript</skill>
    <skill>UI/UX Design</skill>
  </skills>
</cv>`
      });
    } catch (err) {
      setError("Une erreur est survenue lors du traitement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16 animate-fadeIn">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text  mb-6">
          Analyse Intelligente de CV
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transformez vos PDF en données structurées grâce à notre technologie d'extraction avancée
        </p>
        
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>JSON structuré</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>XML formaté</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>100% sécurisé</span>
          </div>
        </div>
      </header>

      <PdfUploader onUploadStart={() => setLoading(true)} onUploadSuccess={handleProcess} />

      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-slideIn">
          <div className="flex">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {loading && <Loader />}

      {!loading && results && (
        <div className="mt-12 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Résultats de l'analyse</h2>
            <span className="text-sm text-gray-500">Temps de traitement: 2.3s</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DisplayData title="Format JSON" data={results.json} type="json" />
            <DisplayData title="Format XML" data={results.xml} type="xml" />
          </div>
        </div>
      )}
    </div>
  );
};