import React from 'react';
import { motion } from 'framer-motion';

interface AIInsightCardProps {
  insights: string[];
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ insights }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-gray-600 text-lg mb-4">AI Insights</h3>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-gray-800"
          >
            {insight}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsightCard;
