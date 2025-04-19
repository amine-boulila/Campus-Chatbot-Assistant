"use client";

import { useState } from 'react';

export default function LostFoundSection() {
  const [itemDescription, setItemDescription] = useState('');
  const [itemType, setItemType] = useState('lost'); // 'lost' ou 'found'
  const [itemLocation, setItemLocation] = useState('');
  const [itemContact, setItemContact] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      // Ici vous feriez un appel API à votre backend pour enregistrer l'objet
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: itemDescription,
          type: itemType,
          location: itemLocation,
          contact: itemContact
        }),
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
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {itemType === 'lost' ? "Déclarer un objet perdu" : "Signaler un objet trouvé"}
      </h2>
      
      <div className="mb-6">
        <div className="flex border rounded overflow-hidden">
          <button
            className={`flex-1 py-2 ${itemType === 'lost' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setItemType('lost')}
          >
            J'ai perdu un objet
          </button>
          <button
            className={`flex-1 py-2 ${itemType === 'found' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setItemType('found')}
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
            rows="3"
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
  );
}