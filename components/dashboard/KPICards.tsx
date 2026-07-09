import React from 'react';
import { motion } from 'framer-motion';

interface KPIProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
}

const KPICards: React.FC<{ kpis: KPIProps[] }> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="text-blue-500 text-3xl">{kpi.icon}</div>
          <div className="ml-4">
            <h3 className="text-gray-600 text-sm">{kpi.title}</h3>
            <p className="text-xl font-bold">{kpi.value}</p>
            {kpi.change && (
              <p className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
