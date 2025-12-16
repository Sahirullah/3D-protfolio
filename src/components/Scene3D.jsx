import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, Environment, ContactShadows } from '@react-three/drei';
import ProfileCard from './ProfileCard';
import ParticleField from './ParticleField';
import FloatingElements from './FloatingElements';

const Scene3D = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const groupRef = useRef();
  const profileRef = useRef();

  useFrame((state) => {
    if (scroll && groupRef.current && profileRef.current) {
      const scrollOffset = scroll.offset;
      
      // Camera Journey - moves through 3D space
      camera.position.z = 8 - scrollOffset * 12;
      camera.position.y = scrollOffset * 4;
      camera.position.x = Math.sin(scrollOffset * Math.PI) * 2;
      
      // Camera looks at different points during journey
      const lookAtY = scrollOffset * 2;
      camera.lookAt(0, lookAtY, 0);
      
      // Profile card transformation during scroll
      if (scrollOffset < 0.5) {
        // Hero phase: centered, floating
        profileRef.current.position.set(0, 0, 0);
        profileRef.current.scale.setScalar(1 - scrollOffset * 0.3);
        profileRef.current.rotation.y = scrollOffset * Math.PI * 0.5;
      } else {
        // About phase: moves to side, becomes part of about layout
        const aboutProgress = (scrollOffset - 0.5) * 2;
        profileRef.current.position.set(-3 + aboutProgress * 0.5, 2, -2);
        profileRef.current.scale.setScalar(0.7);
        profileRef.current.rotation.y = Math.PI * 0.25 + aboutProgress * Math.PI * 0.25;
      }
      
      // Rotate entire scene slightly
      groupRef.current.rotation.y = scrollOffset * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Environment and Lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00d4ff" />
      
      {/* Contact Shadows */}
      <ContactShadows 
        position={[0, -3, 0]} 
        opacity={0.2} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
      
      {/* Particle Field Background */}
      <ParticleField />
      
      {/* Floating Environmental Elements */}
      <FloatingElements />
      
      {/* Main Profile Card - The Star of the Show */}
      <group ref={profileRef}>
        <ProfileCard />
      </group>
      
      {/* About Section 3D Elements */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[4, 2, -5]}>
          <mesh position={[0, 1, 0]}>
            <torusGeometry args={[1, 0.1, 16, 100]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              emissive="#00d4ff" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[1.5, 0.1, 1.5]} />
            <meshStandardMaterial 
              color="#4ecdc4" 
              transparent
              opacity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default Scene3D;