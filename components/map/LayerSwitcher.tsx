import React from 'react';

interface LayerSwitcherProps {
  activeLevel: string;
  onLevelChange: (level: string) => void;
}

const levels = ['country', 'province', 'city', 'district', 'village'];

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  activeLevel,
  onLevelChange,
}) => {
  return (
    <div className="layer-switcher">
      <h4>Administrative Levels</h4>
      <ul>
        {levels.map((level) => (
          <li key={level}>
            <label>
              <input
                type="radio"
                name="admin-level"
                value={level}
                checked={activeLevel === level}
                onChange={() => onLevelChange(level)}
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerSwitcher;
