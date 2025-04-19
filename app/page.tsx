// app/page.tsx
import Link from "next/link";
import { MessageSquare, Map } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Campus Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your interactive assistant for navigating and exploring campus
            facilities and resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/chat">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto">
                <MessageSquare size={30} />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">
                Chat with Guide
              </h2>
              <p className="text-gray-600 text-center">
                Ask questions about campus locations, facilities, and services
                to get instant answers from our virtual assistant.
              </p>
            </div>
          </Link>

          <Link href="/app">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto">
                <Map size={30} />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">
                Campus Map
              </h2>
              <p className="text-gray-600 text-center">
                Browse an interactive map of campus to find buildings, services,
                and get detailed information about each location.
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
              Library Hours
            </button>
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
              Dining Options
            </button>
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
              Event Calendar
            </button>
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
              Sports Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
