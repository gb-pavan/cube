import React from 'react';
import { RotateCw, RotateCcw, Shuffle, Zap, RefreshCw } from 'lucide-react';

interface ControlsProps {
  onFaceRotate: (face: string, clockwise: boolean) => void;
  onAxisRotate: (axis: 'x' | 'y' | 'z', direction: number) => void;
  onScramble: () => void;
  onSolve: () => void;
  onReset: () => void;
  isAnimating: boolean;
  isSolved: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onFaceRotate,
  onAxisRotate,
  onScramble,
  onSolve,
  onReset,
  isAnimating,
  isSolved,
}) => {
  const faceButtons = [
    { label: 'F', face: 'F', name: 'Front' },
    { label: 'B', face: 'B', name: 'Back' },
    { label: 'R', face: 'R', name: 'Right' },
    { label: 'L', face: 'L', name: 'Left' },
    { label: 'U', face: 'U', name: 'Up' },
    { label: 'D', face: 'D', name: 'Down' },
  ];

  return (
    <div className="controls-panel">
      <div className="controls-section">
        <h3 className="controls-title">Face Rotations</h3>
        <div className="face-controls">
          {faceButtons.map(({ label, face, name }) => (
            <div key={face} className="face-control-group">
              <span className="face-label">{name}</span>
              <div className="face-buttons">
                <button
                  className="control-btn face-btn"
                  onClick={() => onFaceRotate(face, true)}
                  disabled={isAnimating}
                  title={`${name} clockwise`}
                >
                  <RotateCw size={16} />
                  {label}
                </button>
                <button
                  className="control-btn face-btn"
                  onClick={() => onFaceRotate(face, false)}
                  disabled={isAnimating}
                  title={`${name} counter-clockwise`}
                >
                  <RotateCcw size={16} />
                  {label}'
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h3 className="controls-title">Cube Rotation</h3>
        <div className="axis-controls">
          <div className="axis-group">
            <span className="axis-label">X-Axis</span>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('x', 90)}
              disabled={isAnimating}
              title="Rotate X+"
            >
              X+
            </button>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('x', -90)}
              disabled={isAnimating}
              title="Rotate X-"
            >
              X-
            </button>
          </div>
          <div className="axis-group">
            <span className="axis-label">Y-Axis</span>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('y', 90)}
              disabled={isAnimating}
              title="Rotate Y+"
            >
              Y+
            </button>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('y', -90)}
              disabled={isAnimating}
              title="Rotate Y-"
            >
              Y-
            </button>
          </div>
          <div className="axis-group">
            <span className="axis-label">Z-Axis</span>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('z', 90)}
              disabled={isAnimating}
              title="Rotate Z+"
            >
              Z+
            </button>
            <button
              className="control-btn axis-btn"
              onClick={() => onAxisRotate('z', -90)}
              disabled={isAnimating}
              title="Rotate Z-"
            >
              Z-
            </button>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <h3 className="controls-title">Actions</h3>
        <div className="action-controls">
          <button
            className="control-btn action-btn scramble-btn"
            onClick={onScramble}
            disabled={isAnimating}
            title="Scramble cube"
          >
            <Shuffle size={20} />
            Scramble
          </button>
          <button
            className="control-btn action-btn solve-btn"
            onClick={onSolve}
            disabled={isAnimating || isSolved}
            title="Solve cube automatically"
          >
            <Zap size={20} />
            Solve
          </button>
          <button
            className="control-btn action-btn reset-btn"
            onClick={onReset}
            disabled={isAnimating}
            title="Reset to solved state"
          >
            <RefreshCw size={20} />
            Reset
          </button>
        </div>
      </div>

      {isSolved && (
        <div className="solved-indicator">
          <div className="solved-message">
            🎉 Cube Solved! 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;