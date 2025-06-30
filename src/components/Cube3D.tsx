import React from 'react';
import { CubeState } from '../types/cube';
import CubeFace from './CubeFace';

interface Cube3DProps {
  cube: CubeState;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  isAnimating: boolean;
}

const Cube3D: React.FC<Cube3DProps> = ({ 
  cube, 
  rotationX, 
  rotationY, 
  rotationZ, 
  isAnimating 
}) => {
  return (
    <div className="cube-container">
      <div 
        className={`cube-3d ${isAnimating ? 'animating' : ''}`}
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
        }}
      >
        <CubeFace face={cube.front} faceType="front" />
        <CubeFace face={cube.back} faceType="back" />
        <CubeFace face={cube.right} faceType="right" />
        <CubeFace face={cube.left} faceType="left" />
        <CubeFace face={cube.up} faceType="up" />
        <CubeFace face={cube.down} faceType="down" />
      </div>
    </div>
  );
};

export default Cube3D;