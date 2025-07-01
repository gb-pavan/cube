import Cube3D from './components/Cube3D';
import Controls from './components/Controls';
import { useCubeState } from './hooks/useCubeState';
import './styles/cube.css';

function App() {
  const {
    cube,
    isAnimating,
    rotationX,
    rotationY,
    rotationZ,
    isSolved,
    rotateFace,
    rotateAxis,
    scramble,
    solve,
    reset,
  } = useCubeState();

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">3D Rubik's Cube</h1>
        <p className="app-subtitle">
          Interactive 3D Rubik's Cube with layer rotations and auto-solve
        </p>
      </div>
      
      <div className="app-content">
        <div className="cube-section">
          <Cube3D
            cube={cube}
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
            isAnimating={isAnimating}
          />
        </div>
        
        <div className="controls-section">
          <Controls
            onFaceRotate={rotateFace}
            onAxisRotate={rotateAxis}
            onScramble={scramble}
            onSolve={solve}
            onReset={reset}
            isAnimating={isAnimating}
            isSolved={isSolved}
          />
        </div>
      </div>
    </div>
  );
}

export default App;