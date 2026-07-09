// components/map/MapSearch.tsx
'use client';

import React, { useState } from 'react';

interface MapSearchProps {
  onSearch: (query: string) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-16 left-4 z-50 bg-white rounded shadow p-2 flex space-x-2 w-72"
    >
      <input
        type="text"
        placeholder="Search location or pollution"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default MapSearch;
