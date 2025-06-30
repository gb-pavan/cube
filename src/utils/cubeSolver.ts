import { CubeState } from '../types/cube';
import { ROTATION_FUNCTIONS } from './cubeRotations';
import { deepClone, isSolved } from './cubeUtils';

export interface SolveStep {
  move: string;
  description: string;
}

export function solveCube(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  let currentCube = deepClone(cube);
  
  // Simple layer-by-layer solving approach
  // This is a simplified version - a full solver would be much more complex
  
  // Step 1: Solve white cross (bottom layer cross)
  const crossSteps = solveWhiteCross(currentCube);
  steps.push(...crossSteps);
  crossSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  // Step 2: Solve white corners (complete bottom layer)
  const cornersSteps = solveWhiteCorners(currentCube);
  steps.push(...cornersSteps);
  cornersSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  // Step 3: Solve middle layer
  const middleSteps = solveMiddleLayer(currentCube);
  steps.push(...middleSteps);
  middleSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  // Step 4: Solve yellow cross (top layer cross)
  const yellowCrossSteps = solveYellowCross(currentCube);
  steps.push(...yellowCrossSteps);
  yellowCrossSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  // Step 5: Orient last layer
  const orientSteps = orientLastLayer(currentCube);
  steps.push(...orientSteps);
  orientSteps.forEach(step => {
    currentCube = applyMove(currentCube, step.move);
  });
  
  // Step 6: Permute last layer
  const permuteSteps = permuteLastLayer(currentCube);
  steps.push(...permuteSteps);
  
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

function solveWhiteCross(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  
  // Simplified white cross solution
  // In a real solver, this would analyze the cube state and determine optimal moves
  const commonCrossMoves = ['F', 'R', 'U', "R'", "U'", "F'"];
  
  steps.push({
    move: commonCrossMoves.join(' '),
    description: 'Forming white cross on bottom face'
  });
  
  return steps;
}

export function debugWhiteEdges(cube: CubeState): void {
  const edgePositions = [
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

  console.log('🔍 Detecting white edge pieces:',cube);

  edgePositions.forEach(({ faces, coords, label }) => {
    const color1 = cube[faces[0] as keyof CubeState][coords[0][0]][coords[0][1]];
    const color2 = cube[faces[1] as keyof CubeState][coords[1][0]][coords[1][1]];
    if (color1 === 'white' || color2 === 'white') {
      console.log(`✅ White edge found at ${label} (${faces[0]}[${coords[0]}], ${faces[1]}[${coords[1]}])`);
    }
  });
}


function solveWhiteCorners(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  debugWhiteEdges(cube);

  
  // Simplified white corners solution
  const cornerAlgorithm = ['R', 'U', "R'", "U'"];
  
  for (let i = 0; i < 4; i++) {
    steps.push({
      move: cornerAlgorithm.join(' '),
      description: `Positioning white corner ${i + 1}`
    });
  }
  
  return steps;
}

function solveMiddleLayer(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  
  // Simplified middle layer solution
  const rightHandAlgorithm = ['U', 'R', "U'", "R'", "U'", "F'", 'U', 'F'];
  const leftHandAlgorithm = ["U'", "L'", 'U', 'L', 'U', 'F', "U'", "F'"];
  
  steps.push({
    move: rightHandAlgorithm.join(' '),
    description: 'Solving middle layer edges (right hand algorithm)'
  });
  
  steps.push({
    move: leftHandAlgorithm.join(' '),
    description: 'Solving middle layer edges (left hand algorithm)'
  });
  
  return steps;
}

function solveYellowCross(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  
  // OLL algorithm for yellow cross
  const ollCross = ['F', 'R', 'U', "R'", "U'", "F'"];
  
  steps.push({
    move: ollCross.join(' '),
    description: 'Creating yellow cross on top face'
  });
  
  return steps;
}

function orientLastLayer(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  
  // Simplified OLL algorithms
  const sune = ['R', 'U', "R'", 'U', 'R', 'U2', "R'"];
  const antiSune = ["R'", "U'", 'R', "U'", "R'", "U2", 'R'];
  
  steps.push({
    move: sune.join(' '),
    description: 'Orient last layer corners (Sune algorithm)'
  });
  
  return steps;
}

function permuteLastLayer(cube: CubeState): SolveStep[] {
  const steps: SolveStep[] = [];
  
  // PLL algorithms
  const tPerm = ['R', 'U', "R'", "F'", 'R', 'U', "R'", "U'", "R'", 'F', 'R2', "U'", "R'"];
  const yPerm = ['F', 'R', "U'", "R'", "U'", 'R', 'U', "R'", "F'", 'R', 'U', "R'", "U'", "R'", 'F', 'R', "F'"];
  
  steps.push({
    move: tPerm.join(' '),
    description: 'Permute last layer (T-Perm algorithm)'
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