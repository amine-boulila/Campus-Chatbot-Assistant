"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Animation au chargement
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 flex flex-col items-center justify-center">
      <div className={`transition-all duration-700 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Bienvenue
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-md mx-auto">
          Choisissez le service dont vous avez besoin
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <Link href="/chatbot" className="w-full transform transition-all duration-300 hover:scale-105 focus:outline-none">
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl h-full border border-white border-opacity-40">
              <div className="mb-6 bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Assistant Virtuel</h2>
              <p className="text-gray-600 mb-6 text-center">Posez vos questions et obtenez des réponses instantanées</p>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 rounded-lg font-medium">
                Commencer une conversation
              </div>
            </div>
          </Link>
          
          <Link href="/lost-found" className="w-full transform transition-all duration-300 hover:scale-105 focus:outline-none">
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl h-full border border-white border-opacity-40">
              <div className="mb-6 bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Objets Perdus & Trouvés</h2>
              <p className="text-gray-600 mb-6 text-center">Déclarez un objet perdu ou signalez un objet trouvé</p>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-lg font-medium">
                Accéder au service
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}