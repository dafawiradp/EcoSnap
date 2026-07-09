import React from 'react';
import { motion } from 'framer-motion';

interface GovernmentActionCardProps {
  actions: string[];
}

const GovernmentActionCard: React.FC<GovernmentActionCardProps> = ({ actions }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-md p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-gray-600 text-lg font-semibold mb-4">Recommended Government Actions</h2>
      <ul className="list-disc list-inside">
        {actions.map((action, index) => (
          <li key={index} className="text-gray-800">
            {action}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default GovernmentActionCard;
