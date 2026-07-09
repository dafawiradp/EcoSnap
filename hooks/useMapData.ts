'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AnalyticsReport } from '@/lib/analytics/types';
import type { PollutionReport } from '@/lib/map/clustering';

interface UseMapDataReturn {
    reports: AnalyticsReport[];
    pollutionReports: PollutionReport[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Hook to fetch and manage map data (reports and pollution reports)
 * Converts between different data formats as needed
 */
export function useMapData(): UseMapDataReturn {
    const [reports, setReports] = useState<AnalyticsReport[]>([]);
    const [pollutionReports, setPollutionReports] = useState<PollutionReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual API call to Supabase
            // For now, return empty arrays to prevent crashes
            setReports([]);
            setPollutionReports([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load map data');
            setReports([]);
            setPollutionReports([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load data on mount
    useEffect(() => {
        void loadData();
    }, [loadData]);

    const refresh = useCallback(async () => {
        await loadData();
    }, [loadData]);

    return {
        reports,
        pollutionReports,
        isLoading,
        error,
        refresh,
    };
}
