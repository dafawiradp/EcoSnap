'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { ForecastResult } from '../../lib/analytics/types';

interface ForecastPanelProps {
  readonly forecast: ForecastResult;
  readonly isLoading: boolean;
}

const TREND_COLORS = {
  increasing: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  decreasing: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  stable: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
};

const TREND_ICONS = {
  increasing: '↑',
  decreasing: '↓',
  stable: '→',
};

interface StatCardProps {
  readonly label: string;
  readonly value: number | string;
  readonly unit?: string;
  readonly index: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
  >
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-800">
      {value}
      {unit && <span className="text-sm font-normal ml-1 text-gray-500">{unit}</span>}
    </p>
  </motion.div>
);

const ForecastPanel: React.FC<ForecastPanelProps> = ({ forecast, isLoading }) => {
  const chartData = useMemo(
    () =>
      forecast.dailyForecasts.slice(0, 14).map((d) => ({
        date: d.date.slice(5),
        predicted: d.predicted,
        lower: d.lower,
        upper: d.upper,
      })),
    [forecast.dailyForecasts]
  );

  const trendStyle = TREND_COLORS[forecast.trendDirection];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Statistical Forecast</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${trendStyle.bg} ${trendStyle.border} ${trendStyle.text}`}
        >
          {TREND_ICONS[forecast.trendDirection]}{' '}
          {forecast.trendDirection.charAt(0).toUpperCase() +
            forecast.trendDirection.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Tomorrow" value={forecast.tomorrow} unit="reports" index={0} />
        <StatCard label="Next Week" value={forecast.nextWeek} unit="reports" index={1} />
        <StatCard label="Next Month" value={forecast.nextMonth} unit="reports" index={2} />
        <StatCard
          label="Confidence"
          value={`${forecast.confidence}%`}
          index={3}
        />
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">
          14-Day Forecast · Growth Rate:{' '}
          <span className={forecast.growthRate > 0 ? 'text-red-500' : 'text-green-500'}>
            {forecast.growthRate > 0 ? '+' : ''}
            {forecast.growthRate.toFixed(1)}%
          </span>
          {' · '}Risk Increase:{' '}
          <span className="text-amber-500">+{forecast.riskIncrease.toFixed(1)}%</span>
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={{
                fontSize: 11,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
              }}
            />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="#e0e7ff"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#forecastGradient)"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#fff"
              fillOpacity={1}
            />
            <ReferenceLine y={0} stroke="#e5e7eb" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-400">
        Forecast uses statistical linear regression and weighted moving average.
        Based on{' '}
        <span className="font-medium text-gray-500">historical report data</span>.
        Not AI-generated.
      </p>
    </div>
  );
};

export default ForecastPanel;
