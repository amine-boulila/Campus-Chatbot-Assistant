"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
// Définition des types
interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatResponse {
  response: string;
}

export default function ChatbotPage() {
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Animation au chargement et défilement automatique
  useEffect(() => {
    setMounted(true);
    scrollToBottom();
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Ajouter le message de l'utilisateur à l'historique
    const userMessage: ChatMessage = { text: chatInput, sender: 'user' };
    setChatMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    const inputText = chatInput;
    setChatInput('');
    
    try {
      // Appel API au backend sur localhost:8000
      const response = await api.post("/ask",{question:inputText})
      
      
      // Ajouter la réponse du chatbot à l'historique
      console.log("response :",response)
      setChatMessages(prev => [...prev, { text: response.data.answer, sender: 'bot' }]);
    } catch (error) {
      console.error('Erreur lors de la communication avec le chatbot:', error);
      setChatMessages(prev => [...prev, { text: "Désolé, une erreur s'est produite.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className={`max-w-4xl mx-auto transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mr-4 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Assistant Virtuel</h1>
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white border-opacity-50">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6 text-white">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-30 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium">Chat Assistant</h2>
                <p className="text-xs text-blue-100">Connecté et prêt à vous aider</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-6 bg-white bg-opacity-50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-2">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                  <p className="text-gray-400 text-sm">Posez votre question ci-dessous pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`p-4 rounded-2xl max-w-[80%] ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex rounded-full bg-gray-100 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 p-4 bg-transparent border-none focus:outline-none text-black"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 focus:outline-none disabled:opacity-50"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}