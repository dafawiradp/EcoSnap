import React from 'react';
import { motion } from 'framer-motion';

interface HealthScoreCardProps {
  score: number;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score }) => {
  const scoreColor = score >= 70 ? 'text-green-500' : score >= 40 ? 'text-yellow-500' : 'text-red-500';

  return (
    <motion.div
      className="bg-white shadow-lg rounded-md p-6 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-gray-600 text-lg font-semibold">Overall Environmental Health Score</h2>
      <p className={`text-4xl font-bold ${scoreColor}`}>{score}</p>
      <p className="text-sm text-gray-500">Scale: 0 (Worst) - 100 (Best)</p>
    </motion.div>
  );
};

export default HealthScoreCard;
