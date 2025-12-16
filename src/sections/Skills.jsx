import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef();
  const skillsRef = useRef();

  const skills = [
    { name: 'React.js', level: 95, color: '#61dafb' },
    { name: 'Three.js', level: 90, color: '#000000' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'TypeScript', level: 85, color: '#3178c6' },
    { name: 'Python', level: 82, color: '#3776ab' },
    { name: 'GSAP', level: 90, color: '#88ce02' },
    { name: 'Blender', level: 75, color: '#f5792a' },
    { name: 'WebGL', level: 80, color: '#990000' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const skillElements = skillsRef.current.children;

    // Animate skill bars
    gsap.fromTo(skillElements,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate progress bars
    skills.forEach((skill, index) => {
      const progressBar = skillElements[index]?.querySelector('.skill-progress');
      if (progressBar) {
        gsap.fromTo(progressBar,
          { width: '0%' },
          {
            width: `${skill.level}%`,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-content">
          <div className="skills-intro">
            <p>
              I specialize in creating immersive web experiences using cutting-edge technologies. 
              My skill set spans across frontend development, 3D graphics, and interactive design.
            </p>
          </div>
          <div ref={skillsRef} className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;