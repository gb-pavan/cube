// cube.ts
import { CubeState, FaceName } from '../types/cube';
import {
  rotateFaceClockwise,
  rotateFaceCounterClockwise,
  deepClone,
  isSolved as isCubeSolved,
} from '../utils/cubeUtils';
import { scrambleCube } from './cubeSolver';

export class Cube {
  private state: CubeState;

  constructor(initialState?: CubeState) {
    this.state = initialState ? deepClone(initialState) : Cube.createSolvedCube();
  }

  public static createSolvedCube(): CubeState {
    const faceColors: Record<FaceName, string> = {
      front: 'white',
      back: 'yellow',
      right: 'red',
      left: 'orange',
      up: 'green',
      down: 'blue',
    };

    const cube: CubeState = {} as CubeState;

    for (const face of Object.keys(faceColors) as FaceName[]) {
      cube[face] = Array(3).fill(null).map(() => Array(3).fill(faceColors[face]));
    }

    return cube;
  }

  public getState(): CubeState {
    return deepClone(this.state);
  }

  public rotate(face: FaceName, clockwise = true): void {
    const faceGrid = this.state[face];

    if (!faceGrid || !Array.isArray(faceGrid)) {
      console.error(`rotate(): Face "${face}" is invalid or uninitialized`, faceGrid);
      return;
    }

    this.state[face] = clockwise
      ? rotateFaceClockwise(faceGrid)
      : rotateFaceCounterClockwise(faceGrid);

    this.rotateAdjacentFaces(face, clockwise);
  }

  private rotateAdjacentFaces(face: FaceName, clockwise: boolean): void {
    console.warn(`rotateAdjacentFaces() not implemented for "${face}" (${clockwise ? 'clockwise' : 'counter-clockwise'})`);
  }

  public scramble(cube?: CubeState, numMoves = 20): { scrambledCube: CubeState; moves: string[] } {
    const baseState = cube ? deepClone(cube) : this.state;
    const { cube: scrambledCube, moves } = scrambleCube(baseState, numMoves);
    this.state = scrambledCube;
    return { scrambledCube, moves };
  }


  public isSolved(): boolean {
    return isCubeSolved(this.state);
  }

  public reset(): void {
    this.state = Cube.createSolvedCube();
  }
}
