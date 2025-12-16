import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

const ProfileCard = ({ mousePosition, scrollY }) => {
  const cardRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    
    if (cardRef.current) {
      // Enhanced floating animation
      cardRef.current.rotation.y = Math.sin(time * 0.3) * 0.15 + (mousePosition?.x || 0) * 0.1;
      cardRef.current.rotation.x = Math.cos(time * 0.2) * 0.08 + (mousePosition?.y || 0) * 0.05;
      
      // Scroll-based transformation
      const scrollProgress = Math.min((scrollY || 0) / 1000, 1);
      cardRef.current.position.y = -scrollProgress * 2;
      cardRef.current.position.x = scrollProgress * -3;
      
      // Hover effect
      const targetScale = hovered ? 1.1 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const glowIntensity = 0.3 + Math.sin(time * 2) * 0.2;
      glowRef.current.material.emissiveIntensity = glowIntensity;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group 
        ref={cardRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Main Holographic Card */}
        <RoundedBox args={[3.5, 4.5, 0.3]} radius={0.15} smoothness={8}>
          <meshStandardMaterial 
            color="#ffffff"
            transparent
            opacity={0.08}
            roughness={0.1}
            metalness={0.9}
            envMapIntensity={2}
          />
        </RoundedBox>
        
        {/* Glowing Border */}
        <RoundedBox args={[3.6, 4.6, 0.31]} radius={0.15} smoothness={8}>
          <meshStandardMaterial 
            color="#00d4ff"
            transparent
            opacity={0.3}
            emissive="#00d4ff"
            emissiveIntensity={0.2}
          />
        </RoundedBox>
        
        {/* Profile Avatar Area */}
        <group position={[0, 0.8, 0.16]}>
          {/* Avatar Background */}
          <Sphere args={[1.2, 32, 32]}>
            <meshStandardMaterial 
              color="#1a1a2e"
              transparent
              opacity={0.6}
              roughness={0.3}
              metalness={0.7}
            />
          </Sphere>
          
          {/* Avatar Initials with Glow */}
          <Text
            position={[0, 0, 0.1]}
            fontSize={1}
            color="#00d4ff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            JD
          </Text>
          
          {/* Rotating Ring */}
          <Ring args={[1.3, 1.4, 32]} rotation={[0, 0, time * 0.5]}>
            <meshStandardMaterial 
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </Ring>
        </group>
        
        {/* Holographic Details */}
        <group position={[0, 0, 0.2]}>
          {/* Corner Elements */}
          {[
            [-1.5, 2], [1.5, 2], [-1.5, -2], [1.5, -2]
          ].map((pos, i) => (
            <group key={i} position={[pos[0], pos[1], 0]}>
              <RoundedBox args={[0.4, 0.08, 0.03]} radius={0.02}>
                <meshStandardMaterial 
                  color="#4ecdc4"
                  emissive="#4ecdc4"
                  emissiveIntensity={0.6}
                />
              </RoundedBox>
              <RoundedBox args={[0.08, 0.4, 0.03]} radius={0.02}>
                <meshStandardMaterial 
                  color="#4ecdc4"
                  emissive="#4ecdc4"
                  emissiveIntensity={0.6}
                />
              </RoundedBox>
            </group>
          ))}
        </group>
        
        {/* Data Visualization */}
        <group position={[0, -1.5, 0.2]}>
          {/* Progress Bars */}
          {[-0.8, -0.4, 0, 0.4].map((y, i) => (
            <group key={i} position={[0, y, 0]}>
              <RoundedBox args={[2, 0.05, 0.02]} radius={0.01}>
                <meshStandardMaterial 
                  color="#333"
                  transparent
                  opacity={0.5}
                />
              </RoundedBox>
              <RoundedBox 
                args={[(0.5 + i * 0.3) * 2, 0.06, 0.03]} 
                radius={0.01}
                position={[-(1 - (0.5 + i * 0.3)), 0, 0.01]}
              >
                <meshStandardMaterial 
                  color={`hsl(${180 + i * 30}, 70%, 60%)`}
                  emissive={`hsl(${180 + i * 30}, 70%, 60%)`}
                  emissiveIntensity={0.3}
                />
              </RoundedBox>
            </group>
          ))}
        </group>
        
        {/* Floating Particles */}
        <group position={[0, 0, 0.4]}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 2.5;
            const height = Math.sin(angle * 2) * 0.5;
            return (
              <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0.2}>
                <Sphere 
                  args={[0.03, 8, 8]} 
                  position={[
                    Math.cos(angle + time * 0.2) * radius,
                    height + Math.sin(time + i) * 0.3,
                    Math.sin(angle + time * 0.2) * radius * 0.3
                  ]}
                >
                  <meshStandardMaterial 
                    color="#ffffff"
                    emissive="#00d4ff"
                    emissiveIntensity={1}
                  />
                </Sphere>
              </Float>
            );
          })}
        </group>
        
        {/* Energy Field */}
        <Ring 
          ref={glowRef}
          args={[3, 3.2, 64]} 
          position={[0, 0, -0.1]}
          rotation={[0, 0, time * 0.1]}
        >
          <meshStandardMaterial 
            color="#00d4ff"
            transparent
            opacity={0.2}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
    </Float>
  );
};

export default ProfileCard;