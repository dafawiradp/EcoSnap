import React from 'react';
import { motion } from 'framer-motion';

interface EmergingPollutionCardProps {
  pollution: string;
  growthRate: number;
}

const EmergingPollutionCard: React.FC<EmergingPollutionCardProps> = ({ pollution, growthRate }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-md p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-gray-600 text-lg font-semibold">Top Emerging Pollution</h2>
      <p className="text-xl font-bold text-blue-500">{pollution}</p>
      <p className="text-sm text-gray-500">Growth Rate: {growthRate.toFixed(1)}%</p>
    </motion.div>
  );
};

export default EmergingPollutionCard;
