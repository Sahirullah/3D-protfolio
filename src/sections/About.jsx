import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    gsap.fromTo(content.children, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <div ref={contentRef} className="about-content">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-intro">
                I'm a passionate Full Stack Developer and 3D Artist with over 5 years of experience 
                creating immersive digital experiences that blend cutting-edge technology with creative design.
              </p>
              <p>
                My expertise spans across modern web technologies, 3D graphics, and interactive design. 
                I specialize in React, Three.js, Node.js, and various 3D modeling tools to bring 
                innovative ideas to life.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="profile-frame">
                  <img src="/public/profile.jpg" alt="Profile" className="profile-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;