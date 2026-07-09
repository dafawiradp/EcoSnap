'use client';

import { motion } from "framer-motion";

interface ExecutiveHeaderProps {
  title?: string;
  loading?: boolean;
  onRefresh?: () => void;
}

export default function ExecutiveHeader({
  title = "Executive Environmental Dashboard",
  loading = false,
  onRefresh,
}: ExecutiveHeaderProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="text-gray-500 mt-2">

            AI-powered environmental intelligence platform for
            monitoring pollution, forecasting environmental risks,
            and supporting executive decision making.

          </p>

        </div>

        <div className="flex gap-3">

          <button

            onClick={onRefresh}

            disabled={loading}

            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition"

          >

            {loading ? "Refreshing..." : "Refresh"}

          </button>

          <div className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50">

            <div className="text-xs text-gray-500">
              Last Updated
            </div>

            <div className="font-semibold">

              {new Date().toLocaleString()}

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );

}