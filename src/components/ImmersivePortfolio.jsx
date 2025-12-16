import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Preload } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from './ProfileCard';
import ParticleField from './ParticleField';
import FloatingElements from './FloatingElements';
import HeroContent from './HeroContent';
import AboutContent from './AboutContent';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const ImmersivePortfolio = () => {
  const containerRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Smooth scroll tracking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Advanced mouse tracking
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    // Scroll-based animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Parallax background elements
        gsap.to(".hero-content", {
          y: progress * -100,
          opacity: 1 - progress * 2,
          duration: 0.3,
          ease: "none"
        });
        
        gsap.to(".about-content", {
          y: (progress - 0.3) * -50,
          opacity: progress > 0.3 ? (progress - 0.3) * 2 : 0,
          duration: 0.3,
          ease: "none"
        });
      }
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="immersive-container">
      <CustomCursor />
      
      {/* Enhanced 3D Canvas */}
      <div className="canvas-wrapper">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <Environment preset="night" />
          <fog attach="fog" args={['#000', 10, 50]} />
          
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[5, -5, -5]} intensity={0.6} color="#ff6b6b" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.5}
            color="#4ecdc4"
            castShadow
          />
          
          {/* 3D Scene Elements */}
          <ParticleField mousePosition={mousePosition} scrollY={scrollY} />
          <FloatingElements mousePosition={mousePosition} scrollY={scrollY} />
          <ProfileCard mousePosition={mousePosition} scrollY={scrollY} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.1}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
          
          <Preload all />
        </Canvas>
      </div>
      
      {/* Enhanced Content Overlay */}
      <div className="content-overlay">
        <div className="section hero-section">
          <HeroContent />
        </div>
        
        <div className="section about-section">
          <AboutContent />
        </div>
        
        <div className="section final-section">
          <div className="final-content">
            <h2>Ready to Create Something Extraordinary?</h2>
            <p className="final-subtitle">Let's bring your vision to life with cutting-edge technology and creative excellence.</p>
            <div className="final-cta">
              <button className="contact-btn primary">
                <span>Start a Project</span>
                <div className="btn-particles"></div>
              </button>
              <button className="contact-btn secondary">
                <span>View Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="bg-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
    </div>
  );
};

export default ImmersivePortfolio;