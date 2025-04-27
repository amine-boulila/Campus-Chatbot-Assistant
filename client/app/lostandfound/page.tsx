// app/lost-found/page.tsx (Page objets perdus/trouvés)
"use client";

import { useState } from 'react';
import Link from 'next/link';

// Définition des types
type ItemType = 'lost' | 'found';
type SubmissionStatus = 'success' | 'error' | null;

interface ItemSubmission {
  description: string;
  type: ItemType;
  location: string;
  contact: string;
}

export default function LostFoundPage() {
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemType, setItemType] = useState<ItemType>('lost');
  const [itemLocation, setItemLocation] = useState<string>('');
  const [itemContact, setItemContact] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const itemData: ItemSubmission = {
        description: itemDescription,
        type: itemType,
        location: itemLocation,
        contact: itemContact
      };
      
      // Appel API au backend
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      
      if (response.ok) {
        setSubmissionStatus('success');
        // Réinitialiser le formulaire
        setItemDescription('');
        setItemLocation('');
        setItemContact('');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setSubmissionStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 hover:underline mr-4">
            &larr; Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold">Objets perdus / trouvés</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {itemType === 'lost' ? "Déclarer un objet perdu" : "Signaler un objet trouvé"}
          </h2>
          
          <div className="mb-6">
            <div className="flex border rounded overflow-hidden">
              <button
                className={`flex-1 py-2 ${itemType === 'lost' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setItemType('lost')}
                type="button"
              >
                J'ai perdu un objet
              </button>
              <button
                className={`flex-1 py-2 ${itemType === 'found' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setItemType('found')}
                type="button"
              >
                J'ai trouvé un objet
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Description de l'objet</label>
              <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Décrivez l'objet en détail..."
                className="w-full p-3 border rounded"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Lieu</label>
              <input
                type="text"
                value={itemLocation}
                onChange={(e) => setItemLocation(e.target.value)}
                placeholder={itemType === 'lost' ? "Où l'avez-vous perdu ?" : "Où l'avez-vous trouvé ?"}
                className="w-full p-3 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Contact</label>
              <input
                type="text"
                value={itemContact}
                onChange={(e) => setItemContact(e.target.value)}
                placeholder="Email ou numéro de téléphone"
                className="w-full p-3 border rounded"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Soumettre
            </button>
          </form>
          
          {submissionStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              Votre déclaration a été enregistrée avec succès !
            </div>
          )}
          
          {submissionStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              Une erreur s'est produite. Veuillez réessayer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}