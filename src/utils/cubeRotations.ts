import { CubeState } from '../types/cube';
import { deepClone, rotateFaceClockwise, rotateFaceCounterClockwise } from './cubeUtils';

export function rotateFront(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.front = rotateFaceClockwise(cube.front);
    // Save the top row of up face
    const temp = [cube.up[2][0], cube.up[2][1], cube.up[2][2]];
    // Up face bottom row <- Left face right column (reversed)
    newCube.up[2][0] = cube.left[2][2];
    newCube.up[2][1] = cube.left[1][2];
    newCube.up[2][2] = cube.left[0][2];
    // Left face right column <- Down face top row
    newCube.left[0][2] = cube.down[0][0];
    newCube.left[1][2] = cube.down[0][1];
    newCube.left[2][2] = cube.down[0][2];
    // Down face top row <- Right face left column (reversed)
    newCube.down[0][0] = cube.right[2][0];
    newCube.down[0][1] = cube.right[1][0];
    newCube.down[0][2] = cube.right[0][0];
    // Right face left column <- temp (up face bottom row)
    newCube.right[0][0] = temp[0];
    newCube.right[1][0] = temp[1];
    newCube.right[2][0] = temp[2];
  } else {
    newCube.front = rotateFaceCounterClockwise(cube.front);
    // Save the top row of up face
    const temp = [cube.up[2][0], cube.up[2][1], cube.up[2][2]];
    // Up face bottom row <- Right face left column
    newCube.up[2][0] = cube.right[0][0];
    newCube.up[2][1] = cube.right[1][0];
    newCube.up[2][2] = cube.right[2][0];
    // Right face left column <- Down face top row (reversed)
    newCube.right[0][0] = cube.down[0][2];
    newCube.right[1][0] = cube.down[0][1];
    newCube.right[2][0] = cube.down[0][0];
    // Down face top row <- Left face right column
    newCube.down[0][0] = cube.left[0][2];
    newCube.down[0][1] = cube.left[1][2];
    newCube.down[0][2] = cube.left[2][2];
    // Left face right column <- temp (up face bottom row, reversed)
    newCube.left[0][2] = temp[2];
    newCube.left[1][2] = temp[1];
    newCube.left[2][2] = temp[0];
  }
  
  return newCube;
}

export function rotateBack(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.back = rotateFaceClockwise(cube.back);
    // Save the top row of up face
    const temp = [cube.up[0][0], cube.up[0][1], cube.up[0][2]];
    // Up face top row <- Right face right column
    newCube.up[0][0] = cube.right[0][2];
    newCube.up[0][1] = cube.right[1][2];
    newCube.up[0][2] = cube.right[2][2];
    // Right face right column <- Down face bottom row (reversed)
    newCube.right[0][2] = cube.down[2][2];
    newCube.right[1][2] = cube.down[2][1];
    newCube.right[2][2] = cube.down[2][0];
    // Down face bottom row <- Left face left column
    newCube.down[2][0] = cube.left[2][0];
    newCube.down[2][1] = cube.left[1][0];
    newCube.down[2][2] = cube.left[0][0];
    // Left face left column <- temp (up face top row, reversed)
    newCube.left[0][0] = temp[2];
    newCube.left[1][0] = temp[1];
    newCube.left[2][0] = temp[0];
  } else {
    newCube.back = rotateFaceCounterClockwise(cube.back);
    // Save the top row of up face
    const temp = [cube.up[0][0], cube.up[0][1], cube.up[0][2]];
    // Up face top row <- Left face left column (reversed)
    newCube.up[0][0] = cube.left[2][0];
    newCube.up[0][1] = cube.left[1][0];
    newCube.up[0][2] = cube.left[0][0];
    // Left face left column <- Down face bottom row
    newCube.left[0][0] = cube.down[2][0];
    newCube.left[1][0] = cube.down[2][1];
    newCube.left[2][0] = cube.down[2][2];
    // Down face bottom row <- Right face right column (reversed)
    newCube.down[2][0] = cube.right[2][2];
    newCube.down[2][1] = cube.right[1][2];
    newCube.down[2][2] = cube.right[0][2];
    // Right face right column <- temp (up face top row)
    newCube.right[0][2] = temp[0];
    newCube.right[1][2] = temp[1];
    newCube.right[2][2] = temp[2];
  }
  
  return newCube;
}

export function rotateRight(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.right = rotateFaceClockwise(cube.right);
    // Save the right column of up face
    const temp = [cube.up[0][2], cube.up[1][2], cube.up[2][2]];
    // Up face right column <- Front face right column
    newCube.up[0][2] = cube.front[0][2];
    newCube.up[1][2] = cube.front[1][2];
    newCube.up[2][2] = cube.front[2][2];
    // Front face right column <- Down face right column
    newCube.front[0][2] = cube.down[0][2];
    newCube.front[1][2] = cube.down[1][2];
    newCube.front[2][2] = cube.down[2][2];
    // Down face right column <- Back face left column (reversed)
    newCube.down[0][2] = cube.back[2][0];
    newCube.down[1][2] = cube.back[1][0];
    newCube.down[2][2] = cube.back[0][0];
    // Back face left column <- temp (up face right column, reversed)
    newCube.back[0][0] = temp[2];
    newCube.back[1][0] = temp[1];
    newCube.back[2][0] = temp[0];
  } else {
    newCube.right = rotateFaceCounterClockwise(cube.right);
    // Save the right column of up face
    const temp = [cube.up[0][2], cube.up[1][2], cube.up[2][2]];
    // Up face right column <- Back face left column (reversed)
    newCube.up[0][2] = cube.back[2][0];
    newCube.up[1][2] = cube.back[1][0];
    newCube.up[2][2] = cube.back[0][0];
    // Back face left column <- Down face right column (reversed)
    newCube.back[0][0] = cube.down[2][2];
    newCube.back[1][0] = cube.down[1][2];
    newCube.back[2][0] = cube.down[0][2];
    // Down face right column <- Front face right column
    newCube.down[0][2] = cube.front[0][2];
    newCube.down[1][2] = cube.front[1][2];
    newCube.down[2][2] = cube.front[2][2];
    // Front face right column <- temp (up face right column)
    newCube.front[0][2] = temp[0];
    newCube.front[1][2] = temp[1];
    newCube.front[2][2] = temp[2];
  }
  
  return newCube;
}

export function rotateLeft(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.left = rotateFaceClockwise(cube.left);
    // Save the left column of up face
    const temp = [cube.up[0][0], cube.up[1][0], cube.up[2][0]];
    // Up face left column <- Back face right column (reversed)
    newCube.up[0][0] = cube.back[2][2];
    newCube.up[1][0] = cube.back[1][2];
    newCube.up[2][0] = cube.back[0][2];
    // Back face right column <- Down face left column (reversed)
    newCube.back[0][2] = cube.down[2][0];
    newCube.back[1][2] = cube.down[1][0];
    newCube.back[2][2] = cube.down[0][0];
    // Down face left column <- Front face left column
    newCube.down[0][0] = cube.front[0][0];
    newCube.down[1][0] = cube.front[1][0];
    newCube.down[2][0] = cube.front[2][0];
    // Front face left column <- temp (up face left column)
    newCube.front[0][0] = temp[0];
    newCube.front[1][0] = temp[1];
    newCube.front[2][0] = temp[2];
  } else {
    newCube.left = rotateFaceCounterClockwise(cube.left);
    // Save the left column of up face
    const temp = [cube.up[0][0], cube.up[1][0], cube.up[2][0]];
    // Up face left column <- Front face left column
    newCube.up[0][0] = cube.front[0][0];
    newCube.up[1][0] = cube.front[1][0];
    newCube.up[2][0] = cube.front[2][0];
    // Front face left column <- Down face left column
    newCube.front[0][0] = cube.down[0][0];
    newCube.front[1][0] = cube.down[1][0];
    newCube.front[2][0] = cube.down[2][0];
    // Down face left column <- Back face right column (reversed)
    newCube.down[0][0] = cube.back[2][2];
    newCube.down[1][0] = cube.back[1][2];
    newCube.down[2][0] = cube.back[0][2];
    // Back face right column <- temp (up face left column, reversed)
    newCube.back[0][2] = temp[2];
    newCube.back[1][2] = temp[1];
    newCube.back[2][2] = temp[0];
  }
  
  return newCube;
}

export function rotateUp(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.up = rotateFaceClockwise(cube.up);
    // Save the top row of front face
    const temp = [cube.front[0][0], cube.front[0][1], cube.front[0][2]];
    // Front face top row <- Right face top row
    newCube.front[0][0] = cube.right[0][0];
    newCube.front[0][1] = cube.right[0][1];
    newCube.front[0][2] = cube.right[0][2];
    // Right face top row <- Back face top row
    newCube.right[0][0] = cube.back[0][0];
    newCube.right[0][1] = cube.back[0][1];
    newCube.right[0][2] = cube.back[0][2];
    // Back face top row <- Left face top row
    newCube.back[0][0] = cube.left[0][0];
    newCube.back[0][1] = cube.left[0][1];
    newCube.back[0][2] = cube.left[0][2];
    // Left face top row <- temp (front face top row)
    newCube.left[0][0] = temp[0];
    newCube.left[0][1] = temp[1];
    newCube.left[0][2] = temp[2];
  } else {
    newCube.up = rotateFaceCounterClockwise(cube.up);
    // Save the top row of front face
    const temp = [cube.front[0][0], cube.front[0][1], cube.front[0][2]];
    // Front face top row <- Left face top row
    newCube.front[0][0] = cube.left[0][0];
    newCube.front[0][1] = cube.left[0][1];
    newCube.front[0][2] = cube.left[0][2];
    // Left face top row <- Back face top row
    newCube.left[0][0] = cube.back[0][0];
    newCube.left[0][1] = cube.back[0][1];
    newCube.left[0][2] = cube.back[0][2];
    // Back face top row <- Right face top row
    newCube.back[0][0] = cube.right[0][0];
    newCube.back[0][1] = cube.right[0][1];
    newCube.back[0][2] = cube.right[0][2];
    // Right face top row <- temp (front face top row)
    newCube.right[0][0] = temp[0];
    newCube.right[0][1] = temp[1];
    newCube.right[0][2] = temp[2];
  }
  
  return newCube;
}

export function rotateDown(cube: CubeState, clockwise: boolean = true): CubeState {
  const newCube = deepClone(cube);
  
  if (clockwise) {
    newCube.down = rotateFaceClockwise(cube.down);
    // Save the bottom row of front face
    const temp = [cube.front[2][0], cube.front[2][1], cube.front[2][2]];
    // Front face bottom row <- Left face bottom row
    newCube.front[2][0] = cube.left[2][0];
    newCube.front[2][1] = cube.left[2][1];
    newCube.front[2][2] = cube.left[2][2];
    // Left face bottom row <- Back face bottom row
    newCube.left[2][0] = cube.back[2][0];
    newCube.left[2][1] = cube.back[2][1];
    newCube.left[2][2] = cube.back[2][2];
    // Back face bottom row <- Right face bottom row
    newCube.back[2][0] = cube.right[2][0];
    newCube.back[2][1] = cube.right[2][1];
    newCube.back[2][2] = cube.right[2][2];
    // Right face bottom row <- temp (front face bottom row)
    newCube.right[2][0] = temp[0];
    newCube.right[2][1] = temp[1];
    newCube.right[2][2] = temp[2];
  } else {
    newCube.down = rotateFaceCounterClockwise(cube.down);
    // Save the bottom row of front face
    const temp = [cube.front[2][0], cube.front[2][1], cube.front[2][2]];
    // Front face bottom row <- Right face bottom row
    newCube.front[2][0] = cube.right[2][0];
    newCube.front[2][1] = cube.right[2][1];
    newCube.front[2][2] = cube.right[2][2];
    // Right face bottom row <- Back face bottom row
    newCube.right[2][0] = cube.back[2][0];
    newCube.right[2][1] = cube.back[2][1];
    newCube.right[2][2] = cube.back[2][2];
    // Back face bottom row <- Left face bottom row
    newCube.back[2][0] = cube.left[2][0];
    newCube.back[2][1] = cube.left[2][1];
    newCube.back[2][2] = cube.left[2][2];
    // Left face bottom row <- temp (front face bottom row)
    newCube.left[2][0] = temp[0];
    newCube.left[2][1] = temp[1];
    newCube.left[2][2] = temp[2];
  }
  
  return newCube;
}

export const ROTATION_FUNCTIONS = {
  F: rotateFront,
  B: rotateBack,
  R: rotateRight,
  L: rotateLeft,
  U: rotateUp,
  D: rotateDown,
};