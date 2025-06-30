import { CubeState, FaceName } from '../types/cube';

export const COLORS = {
  white: '#ffffff',
  yellow: '#ffff00',
  red: '#ff0000',
  orange: '#ff8c00',
  green: '#00ff00',
  blue: '#0000ff',
};

export function createSolvedCube(): CubeState {
  return {
    front: Array(3).fill(null).map(() => Array(3).fill('white')),
    back: Array(3).fill(null).map(() => Array(3).fill('yellow')),
    right: Array(3).fill(null).map(() => Array(3).fill('red')),
    left: Array(3).fill(null).map(() => Array(3).fill('orange')),
    up: Array(3).fill(null).map(() => Array(3).fill('green')),
    down: Array(3).fill(null).map(() => Array(3).fill('blue')),
  };
}

export function rotateFaceClockwise(face: string[][]): string[][] {
  const n = face.length;
  const rotated = Array(n).fill(null).map(() => Array(n).fill(''));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = face[i][j];
    }
  }
  
  return rotated;
}

export function rotateFaceCounterClockwise(face: string[][]): string[][] {
  const n = face.length;
  const rotated = Array(n).fill(null).map(() => Array(n).fill(''));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[n - 1 - j][i] = face[i][j];
    }
  }
  
  return rotated;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isSolved(cube: CubeState): boolean {
  const faces: FaceName[] = ['front', 'back', 'right', 'left', 'up', 'down'];
  
  return faces.every(faceName => {
    const face = cube[faceName];
    const firstColor = face[0][0];
    return face.every(row => row.every(cell => cell === firstColor));
  });
}