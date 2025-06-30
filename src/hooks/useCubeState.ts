import { useState, useCallback } from 'react';
import { CubeState } from '../types/cube';
import { createSolvedCube, isSolved } from '../utils/cubeUtils';
import { ROTATION_FUNCTIONS } from '../utils/cubeRotations';
import { solveCube, scrambleCube, SolveStep } from '../utils/cubeSolver';

export const useCubeState = () => {
  const [cube, setCube] = useState<CubeState>(createSolvedCube());
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationX, setRotationX] = useState(-25);
  const [rotationY, setRotationY] = useState(45);
  const [rotationZ, setRotationZ] = useState(0);

  const animateRotation = useCallback((callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsAnimating(false), 100);
    }, 150);
  }, []);

  const rotateFace = useCallback((face: string, clockwise: boolean) => {
    if (isAnimating) return;
    
    const rotationFunction = ROTATION_FUNCTIONS[face as keyof typeof ROTATION_FUNCTIONS];
    if (rotationFunction) {
      animateRotation(() => {
        setCube(prevCube => rotationFunction(prevCube, clockwise));
      });
    }
  }, [isAnimating, animateRotation]);

  const rotateAxis = useCallback((axis: 'x' | 'y' | 'z', direction: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    if (axis === 'x') {
      setRotationX(prev => prev + direction);
    } else if (axis === 'y') {
      setRotationY(prev => prev + direction);
    } else if (axis === 'z') {
      setRotationZ(prev => prev + direction);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    
    animateRotation(() => {
      const { cube: scrambledCube } = scrambleCube(cube, 25);
      setCube(scrambledCube);
    });
  }, [cube, isAnimating, animateRotation]);

  const solve = useCallback(() => {
    if (isAnimating || isSolved(cube)) return;
    
    const steps = solveCube(cube);
    let currentCube = cube;
    let stepIndex = 0;
    
    const executeStep = () => {
      if (stepIndex >= steps.length) return;
      
      const step = steps[stepIndex];
      const moves = step.move.split(' ').filter(m => m.length > 0);
      
      moves.forEach((move, moveIndex) => {
        setTimeout(() => {
          const face = move[0] as keyof typeof ROTATION_FUNCTIONS;
          const counterClockwise = move.includes("'");
          const double = move.includes('2');
          
          if (ROTATION_FUNCTIONS[face]) {
            setIsAnimating(true);
            setTimeout(() => {
              setCube(prevCube => {
                let newCube = ROTATION_FUNCTIONS[face](prevCube, !counterClockwise);
                if (double) {
                  newCube = ROTATION_FUNCTIONS[face](newCube, !counterClockwise);
                }
                return newCube;
              });
              setTimeout(() => setIsAnimating(false), 100);
            }, 150);
          }
        }, moveIndex * 300);
      });
      
      stepIndex++;
      setTimeout(executeStep, moves.length * 300 + 200);
    };
    
    executeStep();
  }, [cube, isAnimating]);

  const reset = useCallback(() => {
    if (isAnimating) return;
    
    animateRotation(() => {
      setCube(createSolvedCube());
      setRotationX(-25);
      setRotationY(45);
      setRotationZ(0);
    });
  }, [isAnimating, animateRotation]);

  return {
    cube,
    isAnimating,
    rotationX,
    rotationY,
    rotationZ,
    isSolved: isSolved(cube),
    rotateFace,
    rotateAxis,
    scramble,
    solve,
    reset,
  };
};