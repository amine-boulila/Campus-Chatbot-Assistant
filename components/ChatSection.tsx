"use client";

import { useState } from 'react';

export default function ChatSection() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChatSubmit(e) {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Ajouter le message de l'utilisateur à l'historique
    const userMessage = { text: chatInput, sender: 'user' };
    setChatMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    
    try {
      // Appel API au backend sur localhost:8000
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: chatInput }),
      });
      
      const data = await response.json();
      
      // Ajouter la réponse du chatbot à l'historique
      setChatMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Erreur lors de la communication avec le chatbot:', error);
      setChatMessages(prev => [...prev, { text: "Désolé, une erreur s'est produite.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
      setChatInput('');
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded">
        {chatMessages.length === 0 ? (
          <p className="text-gray-500 text-center">Posez votre question au chatbot</p>
        ) : (
          chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 p-3 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-200 max-w-[80%]'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        {isLoading && <p className="text-center">Chargement...</p>}
      </div>

      <form onSubmit={handleChatSubmit} className="flex">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Tapez votre question ici..."
          className="flex-1 p-3 border rounded-l"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 rounded-r"
          disabled={isLoading}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}