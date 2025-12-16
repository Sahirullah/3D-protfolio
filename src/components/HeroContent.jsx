import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HeroContent = () => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(titleRef.current.children, 
      { opacity: 0, y: 100, rotationX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0, 
        duration: 1.5, 
        stagger: 0.2,
        ease: "power4.out" 
      }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=1"
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.8"
    );
  }, []);

  return (
    <div className="hero-content">
      <div className="hero-text">
        <h1 ref={titleRef} className="hero-title">
          <span className="title-word">Creative</span>
          <span className="title-word highlight">Developer</span>
          <span className="title-word">& Designer</span>
        </h1>
        
        <p ref={subtitleRef} className="hero-subtitle">
          Crafting immersive digital experiences that blend technology with artistry
        </p>
        
        <div ref={ctaRef} className="hero-cta">
          <button className="cta-primary">
            <span>Explore Journey</span>
            <div className="btn-glow"></div>
          </button>
          <button className="cta-secondary">
            <span>View Work</span>
          </button>
        </div>
      </div>
      
      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll to begin journey</span>
      </div>
    </div>
  );
};

export default HeroContent;