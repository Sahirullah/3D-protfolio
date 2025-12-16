import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutContent = () => {
  const contentRef = useRef();
  const cardsRef = useRef();

  useEffect(() => {
    const cards = cardsRef.current.children;
    
    gsap.fromTo(cards,
      { opacity: 0, y: 100, rotationX: -45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className="about-content" ref={contentRef}>
      <div className="about-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Passionate about creating digital experiences that inspire and engage
        </p>
      </div>
      
      <div className="about-grid" ref={cardsRef}>
        <div className="info-card">
          <div className="card-icon">🎨</div>
          <h3>Creative Vision</h3>
          <p>
            Blending artistic creativity with technical expertise to craft 
            unique digital experiences that tell compelling stories.
          </p>
        </div>
        
        <div className="info-card">
          <div className="card-icon">⚡</div>
          <h3>Technical Excellence</h3>
          <p>
            Proficient in modern web technologies, 3D graphics, and 
            interactive design with a focus on performance and usability.
          </p>
        </div>
        
        <div className="info-card">
          <div className="card-icon">🚀</div>
          <h3>Innovation Drive</h3>
          <p>
            Always exploring cutting-edge technologies and pushing the 
            boundaries of what's possible in web development.
          </p>
        </div>
        
        <div className="info-card full-width">
          <div className="card-icon">💡</div>
          <h3>My Approach</h3>
          <p>
            I believe in creating digital experiences that are not just functional, 
            but emotionally engaging. Every project is an opportunity to combine 
            technical innovation with human-centered design, resulting in solutions 
            that are both beautiful and meaningful.
          </p>
        </div>
      </div>
      
      <div className="skills-preview">
        <h3>Core Technologies</h3>
        <div className="tech-tags">
          <span className="tech-tag">React.js</span>
          <span className="tech-tag">Three.js</span>
          <span className="tech-tag">GSAP</span>
          <span className="tech-tag">WebGL</span>
          <span className="tech-tag">Node.js</span>
          <span className="tech-tag">TypeScript</span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;