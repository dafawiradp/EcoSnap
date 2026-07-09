'use client';

import ExecutiveHeader from "./ExecutiveHeader";

import { useReports } from "../../hooks/useReports";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function ExecutiveDashboard() {

  const {

    reports,

    isLoading,

    error,

    refresh,

  } = useReports({

    limit: 2000,

  });

  const analytics = useAnalytics(reports);

  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-red-50 border border-red-200 rounded-xl p-8">

          <h2 className="font-bold text-red-600 mb-2">

            Failed to load dashboard

          </h2>

          <p className="text-gray-600">

            {error}

          </p>

          <button

            onClick={refresh}

            className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

          >

            Retry

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-6 space-y-6">

        <ExecutiveHeader

          loading={isLoading}

          onRefresh={refresh}

        />

        {/* ====================================== */}

        {/* PART 2 */}

        {/* KPI + HEALTH SCORE */}

        {/* ====================================== */}

        <div className="grid grid-cols-1 gap-6">

          <div className="bg-white rounded-xl p-8 shadow border border-dashed border-gray-300 text-center">

            <h2 className="text-xl font-bold">

              Executive KPIs

            </h2>

            <p className="text-gray-500 mt-2">

              Coming in Part 2

            </p>

          </div>

        </div>

        {/* ====================================== */}

        {/* PART 3 */}

        {/* AI INSIGHT */}

        {/* ====================================== */}

        <div className="grid grid-cols-1 gap-6">

          <div className="bg-white rounded-xl p-8 shadow border border-dashed border-gray-300 text-center">

            <h2 className="text-xl font-bold">

              AI Environmental Insights

            </h2>

            <p className="text-gray-500 mt-2">

              Coming in Part 3

            </p>

          </div>

        </div>

        {/* ====================================== */}

        {/* PART 4 */}

        {/* PROVINCE */}

        {/* ====================================== */}

        <div className="grid grid-cols-1 gap-6">

          <div className="bg-white rounded-xl p-8 shadow border border-dashed border-gray-300 text-center">

            <h2 className="text-xl font-bold">

              Province Risk Analysis

            </h2>

            <p className="text-gray-500 mt-2">

              Coming in Part 4

            </p>

          </div>

        </div>

        {/* ====================================== */}

        {/* PART 5 */}

        {/* FOOTER */}

        {/* ====================================== */}

        <div className="text-center text-gray-400 text-sm py-8">

          EcoSnap AI Executive Dashboard Ultimate Edition

        </div>

      </div>

    </div>

  );

}