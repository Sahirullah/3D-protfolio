import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';
import CanvasScene from '../components/CanvasScene';

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const canvasRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sophisticated entrance animation
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });
    
    // Staggered text reveal with advanced easing
    tl.set([titleRef.current, subtitleRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 100, 
      rotationX: -90,
      transformOrigin: "center bottom"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.8,
      ease: "power4.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.4,
      ease: "power4.out"
    }, "-=1.2")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "-=0.8");

    // Advanced mouse parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x: xPos, y: yPos });
      
      if (isLoaded) {
        // Multi-layer parallax effect
        gsap.to(titleRef.current, {
          x: xPos * 15,
          y: yPos * 10,
          rotationY: xPos * 2,
          rotationX: -yPos * 1,
          duration: 1.2,
          ease: "power2.out"
        });
        
        gsap.to(subtitleRef.current, {
          x: xPos * 8,
          y: yPos * 5,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(ctaRef.current, {
          x: xPos * 5,
          y: yPos * 3,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    // Scroll-based scene transformation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / (windowHeight * 0.8), 1);
      
      if (scrollProgress > 0) {
        gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
          opacity: 1 - scrollProgress * 1.5,
          y: -scrollY * 0.3,
          scale: 1 - scrollProgress * 0.2,
          duration: 0.1,
          ease: "none"
        });
        
        gsap.to(canvasRef.current, {
          scale: 1 + scrollProgress * 0.2,
          rotationX: scrollProgress * 15,
          duration: 0.1,
          ease: "none"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded]);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Premium 3D Canvas */}
      <div className="canvas-container" ref={canvasRef}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <CanvasScene mousePosition={mousePosition} />
            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={20} 
              blur={2} 
              far={4.5} 
            />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.2}
          />
        </Canvas>
      </div>

      {/* Cinematic Overlay */}
      <div className="cinematic-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="content-wrapper">
          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title">
            <span className="title-line">
              <span className="word">Creative</span>
              <span className="word highlight">Developer</span>
            </span>
            <span className="title-line">
              <span className="word">& 3D</span>
              <span className="word">Artist</span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className="hero-subtitle">
            <p className="subtitle-text">
              Crafting immersive digital experiences with cutting-edge technology
            </p>
            <div className="subtitle-accent"></div>
          </div>
          
          {/* CTA Section */}
          <div ref={ctaRef} className="hero-cta">
            <button className="cta-primary">
              <span className="btn-text">Explore Work</span>
              <div className="btn-bg"></div>
              <div className="btn-glow"></div>
            </button>
            <button className="cta-secondary">
              <span className="btn-text">Get In Touch</span>
              <div className="btn-border"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-dot"></div>
        <span className="scroll-label">Scroll</span>
      </div>

      {/* Ambient Particles */}
      <div className="ambient-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`particle particle-${i % 3}`}></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;