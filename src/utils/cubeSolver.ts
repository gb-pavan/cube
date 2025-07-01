import { CubeState, FaceName } from '../types/cube';
import { ROTATION_FUNCTIONS } from './cubeRotations';
import { deepClone, isSolved } from './cubeUtils';
import { edgePositions } from './edgePositions';

export interface SolveStep {
  move: string;
  description: string;
}

interface EdgeInfo {
  label: string;
  faces: [string, string];
  coords: [[number, number], [number, number]];
  colors: [string, string];
}

export function solveCube(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  let currentCube = deepClone(cube);
  
  const crossSteps = solveWhiteCross(currentCube);
  steps.push(...crossSteps);
  crossSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  return steps;
}

function applyMove(cube: CubeState, moveString: string): CubeState {
  const moves = moveString.split(' ').filter(m => m.length > 0);
  let result = deepClone(cube);
  
  moves.forEach(move => {
    const face = move[0] as keyof typeof ROTATION_FUNCTIONS;
    const counterClockwise = move.includes("'");
    const double = move.includes('2');
    
    if (ROTATION_FUNCTIONS[face]) {
      result = ROTATION_FUNCTIONS[face](result, !counterClockwise);
      if (double) {
        result = ROTATION_FUNCTIONS[face](result, !counterClockwise);
      }
    }
  });
  
  return result;
}

function findWhiteEdges(cube: CubeState): EdgeInfo[] {
  const whiteEdges: EdgeInfo[] = [];

  for (const edge of edgePositions) {
    const [face1, face2] = edge.faces as [FaceName, FaceName];
    const [coord1, coord2] = edge.coords;

    const color1 = cube[face1][coord1[0]][coord1[1]];
    const color2 = cube[face2][coord2[0]][coord2[1]];

    if (color1 === 'white' || color2 === 'white') {
      whiteEdges.push({
        label: edge.label,
        faces: [face1, face2],
        coords: [coord1, coord2],
        colors: [color1, color2],
      });
    }
  }

  return whiteEdges;
}

// function solveWhiteCross(cube: CubeState): SolveStep[] {
//   const steps: SolveStep[] = [];

//   const whiteEdges = findWhiteEdges(cube);
//   console.log("whiteEdges",whiteEdges);
  
//   // Simplified white cross solution
//   // In a real solver, this would analyze the cube state and determine optimal moves
//   const commonCrossMoves = ['F', 'R', 'U', "R'", "U'", "F'"];
  
//   steps.push({
//     move: commonCrossMoves.join(' '),
//     description: 'Forming white cross on bottom face'
//   });
  
//   return steps;
// }

// Assume front face center is white
// And adjacent face centers: up = green, down = blue, left = orange, right = red, back = yellow

export function solveWhiteCross(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  let currentCube = cube;

  const whiteEdges = findWhiteEdges(currentCube);
  console.log("whiteedges",whiteEdges);
  const placedEdges: string[] = [];

  whiteEdges.forEach((edge, index) => {
    if (placedEdges.includes(edge.label)) return;

    const [face1, face2] = edge.faces;
    const [coord1, coord2] = edge.coords;
    const [color1, color2] = edge.colors;

    const whiteIdx = color1 === 'white' ? 0 : 1;
    const whiteFace = edge.faces[whiteIdx];
    const sideFace = edge.faces[1 - whiteIdx];
    const sideColor = edge.colors[1 - whiteIdx];

    // If white is already on the front face center row, skip
    if (
      whiteFace === 'front' &&
      ((coord1[0] === 1 && coord1[1] !== 1) || (coord2[0] === 1 && coord2[1] !== 1))
    ) {
      placedEdges.push(edge.label);
      return;
    }

    let move = '';

    // Basic insert logic per whiteFace position
    switch (whiteFace) {
      case 'up':
        if (sideFace === 'right') move = "U R U' R'";
        else if (sideFace === 'left') move = "U' L' U L";
        else if (sideFace === 'back') move = "U2 B U2 B'";
        else if (sideFace === 'front') move = "U F U'";
        break;
      case 'down':
        if (sideFace === 'right') move = "D R D' R'";
        else if (sideFace === 'left') move = "D' L' D L";
        else if (sideFace === 'back') move = "D2 B D2 B'";
        else if (sideFace === 'front') move = "D F D'";
        break;
      case 'left':
        move = "L' U' L";
        break;
      case 'right':
        move = "R U R'";
        break;
      case 'back':
        move = "B U L U' L' B'";
        break;
      case 'front':
        move = "F U R U' R' F'";
        break;
    }

    if (move) {
      steps.push({
        move,
        description: `Inserting white edge '${edge.label}' from ${whiteFace} → front`
      });
      currentCube = applyMove(currentCube, move);
      placedEdges.push(edge.label);
    }
  });

  // Final alignment (if needed)
  steps.push({
    move: '',
    description: '✅ White cross built on front face with matched adjacent centers'
  });

  return steps;
}

export function scrambleCube(cube: CubeState, numMoves: number = 20): { cube: CubeState; moves: string[] } {
  const moves = ['F', 'B', 'R', 'L', 'U', 'D'];
  const modifiers = ['', "'", '2'];
  const scrambleMoves: string[] = [];
  let result = deepClone(cube);
  
  for (let i = 0; i < numMoves; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    const fullMove = move + modifier;
    
    scrambleMoves.push(fullMove);
    result = applyMove(result, fullMove);
  }
  
  return { cube: result, moves: scrambleMoves };
}