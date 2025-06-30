import React from 'react';
import { COLORS } from '../utils/cubeUtils';

interface CubeFaceProps {
  face: string[][];
  faceType: string;
}

const CubeFace: React.FC<CubeFaceProps> = ({ face, faceType }) => {
  const getColorValue = (color: string): string => {
    return COLORS[color as keyof typeof COLORS] || '#cccccc';
  };

  return (
    <div className={`cube-face cube-face-${faceType}`}>
      <div className="face-grid">
        {face.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="face-cell"
              style={{
                backgroundColor: getColorValue(cell),
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CubeFace;