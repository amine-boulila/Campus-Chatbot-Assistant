"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/api";

type ItemType = 'lost' | 'found';
type SubmissionStatus = 'success' | 'error' | null;

interface MatchResult {
  email: string;
  description: string;
  phone?: string;
  image?: string; // URL to the image
}

export default function LostFoundPage() {
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemType, setItemType] = useState<ItemType>('lost');
  const [itemEmail, setItemEmail] = useState<string>('');
  const [itemPhone, setItemPhone] = useState<string>('');
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [mounted, setMounted] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation on load
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setItemImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setItemImage(null);
    setImagePreview(null);
  };

  // Handle lost item submission (to find matches)
  async function handleLostItemSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('description', itemDescription);
      formData.append('email', itemEmail);
      formData.append('phone', itemPhone);
      
      if (itemImage) {
        formData.append('image', itemImage);
      }
      
      // Send to match endpoint to find potential matches
      const response = await api.post('http://localhost:5000/match', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        setSubmissionStatus('success');
        // Set match results if there are any
        if (response.data ) {
          setMatchResults(response.data);
        } else {
          setMatchResults(null);
        }
        
        // Reset form after 5 seconds if there are no matches
        if (response.data.length === 0) {
          setTimeout(() => {
            resetForm();
          }, 5000);
        }
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting lost item form:', error);
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle found item submission
  async function handleFoundItemSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('description', itemDescription);
      formData.append('email', itemEmail);
      formData.append('phone', itemPhone);
      
      if (itemImage) {
        formData.append('image', itemImage);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // Send to submit endpoint
      const response = await api.post('http://localhost:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSubmissionStatus('success');
        
        // Reset form after success
        setTimeout(() => {
          resetForm();
        }, 5000);
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting found item form:', error);
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);
    }
  }

  // Reset form fields and state
  const resetForm = () => {
    setItemDescription('');
    setItemEmail('');
    setItemPhone('');
    setItemImage(null);
    setImagePreview(null);
    setSubmissionStatus(null);
    setMatchResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-6">
      <div className={`max-w-3xl mx-auto transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Objets Perdus & Trouvés</h1>
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white border-opacity-50">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6 text-white">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-30 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="font-medium">
                {matchResults
                  ? "Correspondance trouvée!"
                  : itemType === 'lost' 
                    ? "Déclarer un objet perdu" 
                    : "Signaler un objet trouvé"
                }
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            {matchResults==null && (
              <div className="mb-8">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    className={`flex-1 py-3 px-4 rounded-md transition-all ${
                      itemType === 'lost' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setItemType('lost')}
                    type="button"
                  >
                    J'ai perdu un objet
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 rounded-md transition-all ${
                      itemType === 'found' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setItemType('found')}
                    type="button"
                  >
                    J'ai trouvé un objet
                  </button>
                </div>
              </div>
            )}
            
            {matchResults  ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">Nous avons trouvé un objet qui est probablement à vous.</h3>
                  <p className="text-gray-600 mb-6">Voici le contact de la personne qui l'a trouvé:</p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-5 max-w-md mx-auto">
                    <div className="flex flex-col items-center">
                      {/* Show contact info */}
                      <div className="text-center mb-4">
                        <p className="text-lg font-medium text-gray-800">{matchResults.email}</p>
                        {matchResults.phone && (
                          <p className="text-gray-600">{matchResults.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={resetForm}
                  className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Faire une nouvelle déclaration
                </button>
              </div>
            ) : (
              <form onSubmit={itemType === 'lost' ? handleLostItemSubmit : handleFoundItemSubmit} className="space-y-6">
                <div className="group">
                  <label className="block mb-2 text-gray-700 font-medium">Description de l'objet</label>
                  <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Décrivez l'objet en détail..."
                    className="w-full p-4 bg-gray-50 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none"
                    rows={3}
                    required
                  />
                </div>
                
                {/* Image Upload Section */}
                <div className="group">
                  <label className="block mb-2 text-gray-700 font-medium">Photo de l'objet</label>
                  <div className="w-full">
                    {!imagePreview ? (
                      <div className="relative">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF (max. 5Mo)</p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-60 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block mb-2 text-gray-700 font-medium">Email</label>
                    <input
                      type="email"
                      value={itemEmail}
                      onChange={(e) => setItemEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full p-4 bg-gray-50 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block mb-2 text-gray-700 font-medium">Téléphone</label>
                    <input
                      type="tel"
                      value={itemPhone}
                      onChange={(e) => setItemPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full p-4 bg-gray-50 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </span>
                  ) : (
                    itemType === 'lost' ? "Rechercher mon objet perdu" : "Signaler l'objet trouvé"
                  )}
                </button>
              </form>
            )}
            
            {submissionStatus === 'success' && matchResults==null && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {itemType === 'lost' 
                  ? "Votre déclaration a été enregistrée. Aucune correspondance trouvée pour le moment." 
                  : "Votre signalement a été enregistré avec succès !"}
              </div>
            )}
            
            {submissionStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Une erreur s'est produite. Veuillez réessayer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}