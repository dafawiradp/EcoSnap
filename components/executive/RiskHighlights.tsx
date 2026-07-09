import React from 'react';

interface RiskHighlightsProps {
  province: string;
  category: string;
}

const RiskHighlights: React.FC<RiskHighlightsProps> = ({ province, category }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-6">
      <h2 className="text-gray-600 text-lg font-semibold mb-4">Risk Highlights</h2>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-500">Highest Risk Province</h3>
          <p className="text-xl font-bold text-red-500">{province}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Highest Risk Category</h3>
          <p className="text-xl font-bold text-red-500">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default RiskHighlights;
