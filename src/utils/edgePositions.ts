// utils/edgePositions.ts
import { FaceName } from '../types/cube';

export const edgePositions: {
  label: string;
  faces: [FaceName, FaceName];
  coords: [[number, number], [number, number]];
}[] = [
  { faces: ['up', 'back'], coords: [[0, 1], [0, 1]], label: 'up-back' },
  { faces: ['up', 'left'], coords: [[1, 0], [0, 1]], label: 'up-left' },
  { faces: ['up', 'right'], coords: [[1, 2], [0, 1]], label: 'up-right' },
  { faces: ['up', 'front'], coords: [[2, 1], [0, 1]], label: 'up-front' },
  { faces: ['down', 'front'], coords: [[0, 1], [2, 1]], label: 'down-front' },
  { faces: ['down', 'left'], coords: [[1, 0], [2, 1]], label: 'down-left' },
  { faces: ['down', 'right'], coords: [[1, 2], [2, 1]], label: 'down-right' },
  { faces: ['down', 'back'], coords: [[2, 1], [2, 1]], label: 'down-back' },
  { faces: ['left', 'front'], coords: [[1, 2], [1, 0]], label: 'left-front' },
  { faces: ['right', 'front'], coords: [[1, 0], [1, 2]], label: 'right-front' },
  { faces: ['left', 'back'], coords: [[1, 0], [1, 2]], label: 'left-back' },
  { faces: ['right', 'back'], coords: [[1, 2], [1, 0]], label: 'right-back' },
];
