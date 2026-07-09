import React, { useState } from 'react';
import { getTimeRange, TimeRange } from '@/lib/map/time';

interface TimeSliderProps {
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({ onTimeRangeChange }) => {
  const [preset, setPreset] = useState('today');

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = e.target.value;
    setPreset(selectedPreset);
    const timeRange = getTimeRange(selectedPreset);
    onTimeRangeChange(timeRange);
  };

  return (
    <div className="time-slider">
      <label htmlFor="time-range">Time Range:</label>
      <select id="time-range" value={preset} onChange={handlePresetChange}>
        <option value="today">Today</option>
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="thisYear">This Year</option>
      </select>
    </div>
  );
};

export default TimeSlider;
