import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Footer from './sections/Footer';
import './index.css';

// Mobile-First Responsive Navigation
function Navbar({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    handleResize(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          JD
        </div>
        
        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <button 
                  className="nav-link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Desktop Actions */}
        {!isMobile && (
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button className="cta-btn" onClick={() => scrollToSection('contact')}>
              Hire Me
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className="mobile-nav-link"
              onClick={() => scrollToSection(item.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </button>
          ))}
          <div className="mobile-actions">
            <button className="theme-toggle mobile" onClick={toggleTheme}>
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button className="cta-btn mobile" onClick={() => scrollToSection('contact')}>
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// 3D Components
function AnimatedCube() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00d4ff"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.x = 3 + Math.cos(state.clock.elapsedTime) * 0.5;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#4ecdc4" 
          emissive="#4ecdc4"
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function AnimatedTorus() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });
  
  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-2, 1, -1]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#ff6b6b" 
          emissive="#ff6b6b"
          emissiveIntensity={0.15}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={particlesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#ff6b6b" />
      <AnimatedCube />
      <AnimatedSphere />
      <AnimatedTorus />
      <Particles />
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    background: isDarkMode ? '#000' : '#f8f9fa',
    sectionBg: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    textPrimary: isDarkMode ? '#fff' : '#333',
    textSecondary: isDarkMode ? '#b0b0b0' : '#666',
    fogColor: isDarkMode ? '#000' : '#f0f0f0'
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="canvas-bg"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset={isDarkMode ? "night" : "dawn"} />
          <fog attach="fog" args={[theme.fogColor, 8, 30]} />
          <Scene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Content */}
      <div className="content">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h1 className="hero-title">John Doe</h1>
            <h2 className="hero-subtitle">Creative Developer & 3D Artist</h2>
            <p className="hero-description">
              Crafting immersive digital experiences that blend cutting-edge technology with creative artistry
            </p>
            <div className="hero-buttons">
              <button className="btn primary">View Portfolio</button>
              <button className="btn secondary">Download CV</button>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-line"></div>
            <span>Scroll</span>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-card">
                <div className="card-icon">👨‍💻</div>
                <h3>Full Stack Developer</h3>
                <p>5+ years of experience building modern web applications with React, Node.js, and cutting-edge technologies.</p>
              </div>
              <div className="about-card">
                <div className="card-icon">🎨</div>
                <h3>3D Artist</h3>
                <p>Specialized in creating immersive 3D experiences using Three.js, WebGL, and Blender for interactive web applications.</p>
              </div>
              <div className="about-card">
                <div className="card-icon">🚀</div>
                <h3>Innovation Focused</h3>
                <p>Passionate about pushing the boundaries of web technology to create unique and engaging user experiences.</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">30+</div>
                <div className="stat-label">Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills">
          <div className="container">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {[
                { name: 'React.js', level: '95%', color: '#61dafb' },
                { name: 'Three.js', level: '90%', color: '#ffffff' },
                { name: 'Node.js', level: '88%', color: '#339933' },
                { name: 'TypeScript', level: '85%', color: '#3178c6' },
                { name: 'WebGL', level: '80%', color: '#990000' },
                { name: 'GSAP', level: '90%', color: '#88ce02' }
              ].map((skill, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-icon" style={{ borderColor: skill.color }}>
                    {skill.name.charAt(0)}
                  </div>
                  <h3>{skill.name}</h3>
                  <div className="skill-level" style={{ color: skill.color }}>
                    {skill.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects">
          <div className="container">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {[
                { 
                  title: '3D E-commerce Platform', 
                  tech: 'React • Three.js • WebGL',
                  description: 'Interactive 3D product visualization',
                  icon: '🛒'
                },
                { 
                  title: 'VR Portfolio Experience', 
                  tech: 'A-Frame • WebXR • Blender',
                  description: 'Immersive virtual reality portfolio',
                  icon: '🥽'
                },
                { 
                  title: 'Interactive 3D Game', 
                  tech: 'Three.js • Socket.io • Physics',
                  description: 'Browser-based multiplayer game',
                  icon: '🎮'
                }
              ].map((project, i) => (
                <div key={i} className="project-card">
                  <div className="project-icon">{project.icon}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">{project.tech}</div>
                  <div className="project-buttons">
                    <button className="btn small primary">View Live</button>
                    <button className="btn small secondary">Code</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>john.doe@example.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Location</h4>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>
              <div className="contact-actions">
                <button className="btn primary large">📄 Download Resume</button>
                <button className="btn secondary large">💼 Schedule Call</button>
              </div>
            </div>
          </div>
        </section>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;