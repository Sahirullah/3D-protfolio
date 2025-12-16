import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef();
  const projectsRef = useRef();

  const projects = [
    {
      title: "3D E-commerce Platform",
      description: "Interactive 3D product visualization with WebGL and Three.js",
      tech: ["React", "Three.js", "WebGL", "Node.js"],
      color: "#00d4ff"
    },
    {
      title: "VR Portfolio Experience",
      description: "Immersive virtual reality portfolio using A-Frame and WebXR",
      tech: ["A-Frame", "WebXR", "JavaScript", "Blender"],
      color: "#ff6b6b"
    },
    {
      title: "AI-Powered Dashboard",
      description: "Real-time analytics dashboard with machine learning insights",
      tech: ["React", "Python", "TensorFlow", "D3.js"],
      color: "#4ecdc4"
    },
    {
      title: "Interactive 3D Game",
      description: "Browser-based 3D game with physics and multiplayer support",
      tech: ["Three.js", "Socket.io", "Cannon.js", "Express"],
      color: "#ffd93d"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const projectElements = projectsRef.current.children;

    gsap.fromTo(projectElements,
      { opacity: 0, y: 50, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-content">
          <div ref={projectsRef} className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header" style={{ borderTopColor: project.color }}>
                  <div className="project-icon" style={{ backgroundColor: project.color }}></div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag" style={{ borderColor: project.color }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  <button className="project-btn" style={{ color: project.color }}>
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;