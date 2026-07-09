// components/map/TimeSlider.tsx
'use client';

import React, { useState } from 'react';

interface TimeSliderProps {
  minDate: Date;
  maxDate: Date;
  onChange: (date: Date) => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({ minDate, maxDate, onChange }) => {
  const [value, setValue] = useState<number>(maxDate.getTime());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(new Date(newValue));
  };

  return (
    <div className="absolute bottom-16 left-4 right-4 z-50 bg-white rounded shadow p-3 flex items-center space-x-4">
      <span>{minDate.toLocaleDateString()}</span>
      <input
        type="range"
        min={minDate.getTime()}
        max={maxDate.getTime()}
        value={value}
        onChange={handleChange}
        className="flex-grow"
      />
      <span>{new Date(value).toLocaleDateString()}</span>
    </div>
  );
};

export default TimeSlider;
