'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Insight } from '../../lib/analytics/types';

interface AIInsightsPanelProps {
  readonly insights: readonly Insight[];
  readonly isLoading: boolean;
  readonly locale?: 'en' | 'id';
}

const SEVERITY_STYLES: Record<Insight['severity'], string> = {
  critical: 'bg-red-50 border-red-400 text-red-800',
  warning: 'bg-amber-50 border-amber-400 text-amber-800',
  info: 'bg-blue-50 border-blue-400 text-blue-800',
};

const SEVERITY_BADGE: Record<Insight['severity'], string> = {
  critical: 'bg-red-100 text-red-700 ring-red-600/20',
  warning: 'bg-amber-100 text-amber-700 ring-amber-600/20',
  info: 'bg-blue-100 text-blue-700 ring-blue-600/20',
};

const SEVERITY_LABEL: Record<Insight['severity'], string> = {
  critical: 'CRITICAL',
  warning: 'WARNING',
  info: 'INFO',
};

const SkeletonRow: React.FC = () => (
  <div className="animate-pulse flex space-x-3 p-3 border border-gray-200 rounded-lg">
    <div className="w-16 h-5 bg-gray-200 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-24" />
    </div>
  </div>
);

const InsightRow: React.FC<{ insight: Insight; index: number }> = ({
  insight,
  index,
}) => (
  <motion.div
    key={insight.id}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.25, delay: index * 0.05 }}
    className={`flex items-start gap-3 p-3 border-l-4 rounded-lg ${SEVERITY_STYLES[insight.severity]}`}
  >
    <span
      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset ${SEVERITY_BADGE[insight.severity]}`}
    >
      {SEVERITY_LABEL[insight.severity]}
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium leading-snug">{insight.message}</p>
      <p className="text-xs mt-1 opacity-70">
        Confidence: {insight.confidence}% ·{' '}
        {insight.category
          ? insight.category.replace(/_/g, ' ')
          : insight.type}
      </p>
    </div>
  </motion.div>
);

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  insights,
  isLoading,
}) => {
  const sorted = useMemo(
    () => [...insights].slice(0, 12),
    [insights]
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">AI Insights</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {insights.length} insights
        </span>
      </div>

      <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : sorted.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No insights available for this period.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {sorted.map((insight, index) => (
              <InsightRow key={insight.id} insight={insight} index={index} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;
