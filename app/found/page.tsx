// app/app/page.tsx
"use client";
import { useState } from "react";
import { Search } from "lucide-react";

// Simple placeholder for campus locations
const campusLocations = [
  {
    id: 1,
    name: "Main Library",
    type: "academic",
    description:
      "Central campus library with study spaces and research resources.",
  },
  {
    id: 2,
    name: "Student Union",
    type: "services",
    description: "Central hub for student activities, dining, and services.",
  },
  {
    id: 3,
    name: "Science Building",
    type: "academic",
    description: "Home to biology, chemistry, and physics labs and classrooms.",
  },
  {
    id: 4,
    name: "Engineering Hall",
    type: "academic",
    description: "Engineering labs, classrooms, and faculty offices.",
  },
  {
    id: 5,
    name: "Recreation Center",
    type: "athletics",
    description: "Gym, pool, courts, and fitness classes.",
  },
  {
    id: 6,
    name: "North Residence Hall",
    type: "housing",
    description: "Student housing primarily for freshmen.",
  },
  {
    id: 7,
    name: "South Residence Hall",
    type: "housing",
    description: "Student housing primarily for upperclassmen.",
  },
  {
    id: 8,
    name: "Dining Hall",
    type: "services",
    description: "Main campus dining facility.",
  },
  {
    id: 9,
    name: "Computer Lab",
    type: "academic",
    description: "24-hour access computer facility.",
  },
  {
    id: 10,
    name: "Health Center",
    type: "services",
    description: "Campus health and wellness services.",
  },
];

export default function CampusMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof campusLocations)[0] | null
  >(null);

  const filteredLocations = campusLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
      {/* Sidebar with search and list */}
      <div className="lg:w-1/4 bg-white p-4 border-r border-gray-200 overflow-y-auto">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search campus locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <h2 className="font-semibold mb-2">Campus Locations</h2>
        <ul className="space-y-2">
          {filteredLocations.map((location) => (
            <li key={location.id}>
              <button
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  selectedLocation?.id === location.id
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {location.type}
                </div>
              </button>
            </li>
          ))}
          {filteredLocations.length === 0 && (
            <li className="text-gray-500 p-2">No locations found</li>
          )}
        </ul>
      </div>

      {/* Main content area with map */}
      <div className="flex-1 p-4 bg-gray-100">
        {selectedLocation ? (
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h1 className="text-2xl font-bold mb-4">{selectedLocation.name}</h1>
            <div className="mb-4 p-4 bg-gray-200 rounded-lg text-center text-gray-600">
              [Campus Map Visualization Would Go Here]
              <div className="mt-2 text-sm">
                This is a placeholder for an interactive campus map
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">
                About this Location
              </h2>
              <p>{selectedLocation.description}</p>
              <div className="mt-4 text-sm text-gray-600">
                <div>
                  <strong>Type:</strong>{" "}
                  <span className="capitalize">{selectedLocation.type}</span>
                </div>
                <div>
                  <strong>Building Hours:</strong> 7:00 AM - 10:00 PM (Mon-Fri)
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
            <div className="text-center text-gray-500">
              <p className="mb-4">
                Select a location from the sidebar to view details
              </p>
              <div className="p-8 bg-gray-200 rounded-lg w-full max-w-lg">
                [Campus Overview Map Would Go Here]
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
