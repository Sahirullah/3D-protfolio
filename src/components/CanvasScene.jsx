import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, Icosahedron, Octahedron, Text3D, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GeometricObject = ({ position, geometry, material, speed = 1, mousePosition }) => {
  const meshRef = useRef();
  const initialPosition = useMemo(() => position, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Complex rotation patterns
      meshRef.current.rotation.x = Math.sin(time * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.rotation.z = Math.cos(time * speed * 0.2) * 0.1;
      
      // Orbital movement
      const radius = 0.5;
      meshRef.current.position.x = initialPosition[0] + Math.sin(time * speed * 0.1) * radius;
      meshRef.current.position.z = initialPosition[2] + Math.cos(time * speed * 0.1) * radius;
      
      // Mouse interaction with physics-like response
      if (mousePosition) {
        const mouseInfluence = 0.3;
        meshRef.current.position.x += mousePosition.x * mouseInfluence;
        meshRef.current.position.y += mousePosition.y * mouseInfluence * 0.5;
        
        // Rotation response to mouse
        meshRef.current.rotation.y += mousePosition.x * 0.01;
        meshRef.current.rotation.x += mousePosition.y * 0.01;
      }
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        {geometry}
        {material}
      </mesh>
    </Float>
  );
};

const CentralSphere = ({ mousePosition }) => {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    if (meshRef.current && innerRef.current) {
      const time = state.clock.elapsedTime;
      
      // Breathing animation
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
      
      // Counter-rotation for inner sphere
      meshRef.current.rotation.y = time * 0.1;
      innerRef.current.rotation.y = -time * 0.15;
      innerRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      
      // Mouse interaction
      if (mousePosition) {
        meshRef.current.rotation.x = mousePosition.y * 0.1;
        meshRef.current.rotation.z = mousePosition.x * 0.05;
      }
    }
  });

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.3}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Inner distorted sphere */}
      <mesh ref={innerRef} castShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#4ecdc4"
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Core energy sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

const FloatingRing = ({ position, mousePosition }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.elapsedTime;
      ringRef.current.rotation.x = time * 0.2;
      ringRef.current.rotation.y = time * 0.3;
      
      if (mousePosition) {
        ringRef.current.position.x = position[0] + mousePosition.x * 0.2;
        ringRef.current.position.y = position[1] + mousePosition.y * 0.1;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ringRef} position={position} castShadow>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff6b6b"
          emissive="#ff6b6b"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const ParticleSystem = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const CanvasScene = ({ mousePosition }) => {
  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        castShadow
      />
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Central Sphere Complex */}
      <CentralSphere mousePosition={mousePosition} />
      
      {/* Floating Ring */}
      <FloatingRing position={[0, 0, -3]} mousePosition={mousePosition} />
      
      {/* Geometric Objects with Advanced Materials */}
      <GeometricObject 
        position={[-4, 2, -2]} 
        geometry={<icosahedronGeometry args={[0.8]} />}
        material={
          <MeshWobbleMaterial
            color="#ff6b6b"
            transparent
            opacity={0.8}
            factor={0.6}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        }
        speed={0.8}
        mousePosition={mousePosition}
      />
      
      <GeometricObject 
        position={[4, -1, -1]} 
        geometry={<octahedronGeometry args={[1]} />}
        material={
          <meshStandardMaterial
            color="#ffd93d"
            emissive="#ffd93d"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        }
        speed={1.2}
        mousePosition={mousePosition}
      />
      
      <GeometricObject 
        position={[-3, -2, 1]} 
        geometry={<torusGeometry args={[0.8, 0.3, 16, 100]} />}
        material={
          <meshStandardMaterial
            color="#6c5ce7"
            transparent
            opacity={0.9}
            metalness={0.9}
            roughness={0.1}
            emissive="#6c5ce7"
            emissiveIntensity={0.1}
          />
        }
        speed={0.6}
        mousePosition={mousePosition}
      />
      
      <GeometricObject 
        position={[3, 3, 0]} 
        geometry={<boxGeometry args={[1, 1, 1]} />}
        material={
          <MeshDistortMaterial
            color="#00b894"
            transparent
            opacity={0.8}
            distort={0.4}
            speed={3}
            metalness={0.8}
            roughness={0.2}
          />
        }
        speed={0.9}
        mousePosition={mousePosition}
      />
      
      <GeometricObject 
        position={[-2, 1, 2]} 
        geometry={<sphereGeometry args={[0.6, 32, 32]} />}
        material={
          <meshStandardMaterial
            color="#fd79a8"
            emissive="#fd79a8"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        }
        speed={1.4}
        mousePosition={mousePosition}
      />
    </>
  );
};

export default CanvasScene;