// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Map, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Campus Guide</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/chat"
              className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="mr-2" size={18} />
              <span>Chatbot</span>
            </Link>
            <Link
              href="/found"
              className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <Map className="mr-2" size={18} />
              <span>Campus Map</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/chat"
              className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="mr-2" size={18} />
              <span>Chatbot</span>
            </Link>
            <Link
              href="/app"
              className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="mr-2" size={18} />
              <span>Campus Map</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
