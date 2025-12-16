import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';

const FloatingElement = ({ position, geometry, material, speed = 1, scale = 1, mousePosition, scrollY }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Complex orbital movement
      const orbitRadius = 3;
      meshRef.current.position.x = position[0] + Math.sin(time * speed * 0.2) * orbitRadius;
      meshRef.current.position.z = position[2] + Math.cos(time * speed * 0.2) * orbitRadius;
      meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.3) * 1;
      
      // Multi-axis rotation
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.y += 0.012 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
      
      // Mouse interaction
      if (mousePosition) {
        meshRef.current.rotation.y += mousePosition.x * 0.02;
        meshRef.current.rotation.x += mousePosition.y * 0.01;
      }
      
      // Scroll-based effects
      const scrollProgress = Math.min((scrollY || 0) / 1500, 1);
      meshRef.current.scale.setScalar(scale * (1 + scrollProgress * 0.3));
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        {geometry}
        {material}
      </mesh>
    </Float>
  );
};

const FloatingElements = ({ mousePosition, scrollY }) => {
  return (
    <group>
      {/* Enhanced Geometric Elements */}
      <FloatingElement
        position={[-8, 4, -6]}
        geometry={<icosahedronGeometry args={[1.2]} />}
        material={
          <MeshDistortMaterial
            color="#00d4ff"
            transparent
            opacity={0.8}
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive="#00d4ff"
            emissiveIntensity={0.2}
          />
        }
        speed={0.8}
        scale={0.9}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <FloatingElement
        position={[7, -3, -9]}
        geometry={<octahedronGeometry args={[1.5]} />}
        material={
          <MeshWobbleMaterial
            color="#ff6b6b"
            transparent
            opacity={0.7}
            factor={0.6}
            speed={3}
            roughness={0.2}
            metalness={0.8}
            emissive="#ff6b6b"
            emissiveIntensity={0.15}
          />
        }
        speed={1.2}
        scale={0.7}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <FloatingElement
        position={[-6, -5, -12]}
        geometry={<torusGeometry args={[1.2, 0.4, 16, 100]} />}
        material={
          <meshStandardMaterial
            color="#4ecdc4"
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={0.9}
            emissive="#4ecdc4"
            emissiveIntensity={0.3}
          />
        }
        speed={0.6}
        scale={1.1}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <FloatingElement
        position={[9, 5, -7]}
        geometry={<dodecahedronGeometry args={[1]} />}
        material={
          <MeshDistortMaterial
            color="#ffd93d"
            transparent
            opacity={0.8}
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.7}
            emissive="#ffd93d"
            emissiveIntensity={0.2}
          />
        }
        speed={0.9}
        scale={0.8}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <FloatingElement
        position={[-7, 2, -15]}
        geometry={<tetrahedronGeometry args={[1.3]} />}
        material={
          <meshStandardMaterial
            color="#6c5ce7"
            transparent
            opacity={0.85}
            roughness={0.15}
            metalness={0.85}
            emissive="#6c5ce7"
            emissiveIntensity={0.25}
          />
        }
        speed={1.1}
        scale={0.9}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <FloatingElement
        position={[5, -6, -8]}
        geometry={<torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
        material={
          <MeshWobbleMaterial
            color="#fd79a8"
            transparent
            opacity={0.75}
            factor={0.5}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#fd79a8"
            emissiveIntensity={0.2}
          />
        }
        speed={1.3}
        scale={0.6}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      {/* Background Energy Rings */}
      <group position={[0, 0, -25]}>
        {[0, 1, 2, 3].map((i) => (
          <Float key={i} speed={0.3 + i * 0.1} rotationIntensity={0.1}>
            <mesh 
              rotation={[Math.PI / 2, 0, 0]} 
              position={[0, 0, i * 8]}
              scale={1 + i * 0.3}
            >
              <torusGeometry args={[12 + i * 3, 0.2, 16, 100]} />
              <meshStandardMaterial
                color="#00d4ff"
                transparent
                opacity={0.15 - i * 0.03}
                emissive="#00d4ff"
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      {/* Distant Atmospheric Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingElement
          key={`distant-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20,
            -20 - Math.random() * 15
          ]}
          geometry={<sphereGeometry args={[0.3 + Math.random() * 0.5, 16, 16]} />}
          material={
            <meshStandardMaterial
              color={`hsl(${180 + i * 45}, 70%, 60%)`}
              transparent
              opacity={0.4}
              emissive={`hsl(${180 + i * 45}, 70%, 60%)`}
              emissiveIntensity={0.3}
            />
          }
          speed={0.3 + Math.random() * 0.5}
          scale={0.5 + Math.random() * 0.3}
          mousePosition={mousePosition}
          scrollY={scrollY}
        />
      ))}
    </group>
  );
};

export default FloatingElements;