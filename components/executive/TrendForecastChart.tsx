import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendForecastChartProps {
  data: { date: string; value: number }[];
}

const TrendForecastChart: React.FC<TrendForecastChartProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-6">
      <h2 className="text-gray-600 text-lg font-semibold mb-4">Trend and Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendForecastChart;
