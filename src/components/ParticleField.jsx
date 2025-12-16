import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ mousePosition, scrollY }) => {
  const pointsRef = useRef();
  const particleCount = 800;
  
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#4ecdc4'),
      new THREE.Color('#ff6b6b'),
      new THREE.Color('#ffd93d'),
      new THREE.Color('#6c5ce7'),
      new THREE.Color('#fd79a8'),
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create layered distribution
      const layer = Math.floor(i / (particleCount / 3));
      const radius = 15 + layer * 10;
      
      // Spherical coordinates
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color assignment
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Size variation
      sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      
      // Complex rotation patterns
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Mouse interaction
      if (mousePosition) {
        pointsRef.current.rotation.y += mousePosition.x * 0.1;
        pointsRef.current.rotation.x += mousePosition.y * 0.05;
      }
      
      // Scroll-based transformation
      const scrollProgress = Math.min((scrollY || 0) / 2000, 1);
      pointsRef.current.scale.setScalar(1 + scrollProgress * 0.5);
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      pointsRef.current.scale.multiplyScalar(scale);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.001}
      />
    </Points>
  );
};

export default ParticleField;