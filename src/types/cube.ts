export interface CubeState {
  front: string[][];
  back: string[][];
  right: string[][];
  left: string[][];
  up: string[][];
  down: string[][];
}

export interface Move {
  face: string;
  clockwise: boolean;
}

export type FaceName = 'front' | 'back' | 'right' | 'left' | 'up' | 'down';