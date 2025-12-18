import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Footer from './sections/Footer';
import './index.css';

// Navigation Component
function Navbar({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0',
      background: isScrolled ? 
        (isDarkMode ? 'rgba(10, 10, 10, 0.9)' : 'rgba(255, 255, 255, 0.9)') : 
        'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? 
        (isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)') : 
        (isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'),
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '1.8rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          cursor: 'pointer'
        }}>
          JD
        </div>
        
        {/* Navigation Menu */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '2.5rem',
          margin: 0,
          padding: 0
        }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button style={{
                background: 'none',
                border: 'none',
                color: isDarkMode ? '#b0b0b0' : '#666',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.2)';
                e.target.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
                
                // Create animated underline effect
                if (!e.target.querySelector('.nav-underline')) {
                  const underline = document.createElement('div');
                  underline.className = 'nav-underline';
                  underline.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #00d4ff, #4ecdc4);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                  `;
                  e.target.appendChild(underline);
                  setTimeout(() => {
                    underline.style.transform = 'scaleX(1)';
                  }, 10);
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0b0';
                e.target.style.background = 'none';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
                e.target.style.textShadow = 'none';
                
                // Remove underline
                const underline = e.target.querySelector('.nav-underline');
                if (underline) {
                  underline.style.transform = 'scaleX(0)';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>



        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            width: '45px',
            height: '45px',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
            borderRadius: '50%',
            color: isDarkMode ? '#ffd93d' : '#ff6b6b',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            marginRight: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) rotate(15deg)';
            e.target.style.boxShadow = `0 8px 25px ${isDarkMode ? 'rgba(255, 217, 61, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`;
            e.target.style.borderColor = isDarkMode ? '#ffd93d' : '#ff6b6b';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.boxShadow = 'none';
            e.target.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
          }}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>

        {/* CTA Button */}
        <button style={{
          padding: '0.8rem 1.5rem',
          background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
          border: 'none',
          borderRadius: '25px',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.05)';
          e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.6)';
          e.target.style.background = 'linear-gradient(135deg, #00d4ff, #4ecdc4, #00d4ff)';
          e.target.style.backgroundSize = '200% 200%';
          e.target.style.animation = 'gradientShift 2s ease infinite';
          
          // Add ripple effect
          if (!e.target.querySelector('.ripple-effect')) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              transition: width 0.6s ease, height 0.6s ease;
            `;
            e.target.appendChild(ripple);
            setTimeout(() => {
              ripple.style.width = '200px';
              ripple.style.height = '200px';
            }, 10);
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = 'none';
          e.target.style.background = 'linear-gradient(135deg, #00d4ff, #4ecdc4)';
          e.target.style.animation = 'none';
          
          // Remove ripple effect
          const ripple = e.target.querySelector('.ripple-effect');
          if (ripple) {
            ripple.style.opacity = '0';
            setTimeout(() => {
              if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
              }
            }, 300);
          }
        }}>
          Hire Me
        </button>
      </div>
    </nav>
  );
}

// Animated 3D Objects
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

// Simple Particle Field
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
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#ff6b6b" />
      
      {/* 3D Objects */}
      <AnimatedCube />
      <AnimatedSphere />
      <AnimatedTorus />
      <Particles />
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced loading time for debugging
    return () => clearTimeout(timer);
  }, []);

  // Theme colors
  const theme = {
    background: isDarkMode ? '#000' : '#f8f9fa',
    sectionBg: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    sectionBgAlt: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(248, 249, 250, 0.9)',
    cardBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    cardBgHover: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    inputBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    textPrimary: isDarkMode ? '#fff' : '#333',
    textSecondary: isDarkMode ? '#b0b0b0' : '#666',
    textTertiary: isDarkMode ? '#888' : '#999',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    borderHover: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    borderInput: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    fogColor: isDarkMode ? '#000' : '#f0f0f0',
    shadow: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
  };

  // Apply theme to document root for global CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-bg', theme.background);
    document.documentElement.style.setProperty('--theme-text-primary', theme.textPrimary);
    document.documentElement.style.setProperty('--theme-text-secondary', theme.textSecondary);
    document.documentElement.style.setProperty('--theme-card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--theme-border', theme.border);
  }, [isDarkMode]);

  // Loader Component
  const Loader = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: isDarkMode ? '#000' : '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'opacity 0.5s ease'
    }}>
      {/* Logo Animation */}
      <div style={{
        fontSize: '4rem',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '2rem',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        JD
      </div>

      {/* Loading Animation */}
      <div style={{
        width: '60px',
        height: '60px',
        border: `3px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderTop: '3px solid #00d4ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>

      {/* Loading Text */}
      <p style={{
        color: theme.textSecondary,
        fontSize: '1rem',
        fontWeight: '500',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        Loading Experience...
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '2px',
        background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderRadius: '1px',
        marginTop: '1rem',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #00d4ff, #4ecdc4)',
          borderRadius: '1px',
          animation: 'loadProgress 2.5s ease-out forwards'
        }}></div>
      </div>
    </div>
  );

  // Temporarily disable loader for debugging
  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`} style={{ 
      background: theme.background,
      animation: 'fadeIn 0.8s ease-out'
    }}>
      {/* Navigation Header */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
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
      
      {/* Scrollable Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: '900',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #4ecdc4 50%, #ff6b6b 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(0, 212, 255, 0.3)',
            animation: 'gradientShift 4s ease-in-out infinite'
          }}>
            John Doe
          </h1>
          
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '300',
            color: theme.textSecondary,
            marginBottom: '2rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Creative Developer & 3D Artist
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: theme.textSecondary,
            marginBottom: '3rem',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Crafting immersive digital experiences that blend cutting-edge technology with creative artistry
          </p>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            pointerEvents: 'auto'
          }}>
            <button style={{
              padding: '1.2rem 2.5rem',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              View Portfolio
            </button>
            
            <button style={{
              padding: '1.2rem 2.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Download CV
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.textSecondary,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            <div style={{
              width: '2px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, #00d4ff, transparent)',
              marginBottom: '0.5rem',
              animation: 'scrollPulse 2s ease-in-out infinite'
            }}></div>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* About Section */}
        <div style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.sectionBg,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            width: '100%'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: '3rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              About Me
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)';
                
                // Add glow effect
                if (!e.currentTarget.querySelector('.glow-effect')) {
                  const glow = document.createElement('div');
                  glow.className = 'glow-effect';
                  glow.style.cssText = `
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                  `;
                  e.currentTarget.appendChild(glow);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                
                // Remove glow effect
                const glow = e.currentTarget.querySelector('.glow-effect');
                if (glow) {
                  glow.style.opacity = '0';
                  setTimeout(() => {
                    if (glow.parentNode) {
                      glow.parentNode.removeChild(glow);
                    }
                  }, 300);
                }
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#00d4ff',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  🎨 Creative Vision
                </h3>
                <p style={{
                  color: theme.textSecondary,
                  lineHeight: '1.7',
                  transition: 'color 0.3s ease'
                }}>
                  I'm a passionate Creative Developer and 3D Artist with over 5 years of experience 
                  creating immersive digital experiences that push the boundaries of web technology.
                </p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = '#4ecdc4';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(78, 205, 196, 0.3)';
                e.currentTarget.style.background = 'rgba(78, 205, 196, 0.08)';
                
                // Add glow effect
                if (!e.currentTarget.querySelector('.glow-effect')) {
                  const glow = document.createElement('div');
                  glow.className = 'glow-effect';
                  glow.style.cssText = `
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                  `;
                  e.currentTarget.appendChild(glow);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                
                // Remove glow effect
                const glow = e.currentTarget.querySelector('.glow-effect');
                if (glow) {
                  glow.style.opacity = '0';
                  setTimeout(() => {
                    if (glow.parentNode) {
                      glow.parentNode.removeChild(glow);
                    }
                  }, 300);
                }
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#4ecdc4',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  ⚡ Technical Excellence
                </h3>
                <p style={{
                  color: theme.textSecondary,
                  lineHeight: '1.7',
                  transition: 'color 0.3s ease'
                }}>
                  My expertise spans across React, Three.js, WebGL, and modern animation libraries. 
                  I specialize in creating interactive 3D websites that tell compelling stories.
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.4)';
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                
                // Animate the number
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1.1)';
                  numberEl.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                }
                
                // Add pulse effect
                if (!e.currentTarget.querySelector('.pulse-effect')) {
                  const pulse = document.createElement('div');
                  pulse.className = 'pulse-effect';
                  pulse.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    height: 100px;
                    background: rgba(0, 212, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: pulse 1.5s ease-out infinite;
                    pointer-events: none;
                  `;
                  e.currentTarget.appendChild(pulse);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                
                // Reset number animation
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1)';
                  numberEl.style.textShadow = 'none';
                }
                
                // Remove pulse effect
                const pulse = e.currentTarget.querySelector('.pulse-effect');
                if (pulse && pulse.parentNode) {
                  pulse.parentNode.removeChild(pulse);
                }
              }}>
                <div className="stat-number" style={{ 
                  fontSize: '3rem', 
                  color: '#00d4ff', 
                  marginBottom: '0.5rem',
                  fontWeight: '800',
                  transition: 'all 0.3s ease'
                }}>
                  50+
                </div>
                <div style={{ 
                  color: theme.textTertiary, 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}>
                  Projects Completed
                </div>
              </div>
              
              <div style={{
                background: 'rgba(78, 205, 196, 0.1)',
                border: '2px solid rgba(78, 205, 196, 0.3)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.borderColor = '#4ecdc4';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(78, 205, 196, 0.4)';
                e.currentTarget.style.background = 'rgba(78, 205, 196, 0.2)';
                
                // Animate the number
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1.1)';
                  numberEl.style.textShadow = '0 0 20px rgba(78, 205, 196, 0.8)';
                }
                
                // Add pulse effect
                if (!e.currentTarget.querySelector('.pulse-effect')) {
                  const pulse = document.createElement('div');
                  pulse.className = 'pulse-effect';
                  pulse.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    height: 100px;
                    background: rgba(78, 205, 196, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: pulse 1.5s ease-out infinite;
                    pointer-events: none;
                  `;
                  e.currentTarget.appendChild(pulse);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.3)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = 'rgba(78, 205, 196, 0.1)';
                
                // Reset number animation
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1)';
                  numberEl.style.textShadow = 'none';
                }
                
                // Remove pulse effect
                const pulse = e.currentTarget.querySelector('.pulse-effect');
                if (pulse && pulse.parentNode) {
                  pulse.parentNode.removeChild(pulse);
                }
              }}>
                <div className="stat-number" style={{ 
                  fontSize: '3rem', 
                  color: '#4ecdc4', 
                  marginBottom: '0.5rem',
                  fontWeight: '800',
                  transition: 'all 0.3s ease'
                }}>
                  5+
                </div>
                <div style={{ 
                  color: theme.textTertiary, 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}>
                  Years Experience
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                border: '2px solid rgba(255, 107, 107, 0.3)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.borderColor = '#ff6b6b';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
                
                // Animate the number
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1.1)';
                  numberEl.style.textShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
                }
                
                // Add pulse effect
                if (!e.currentTarget.querySelector('.pulse-effect')) {
                  const pulse = document.createElement('div');
                  pulse.className = 'pulse-effect';
                  pulse.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    height: 100px;
                    background: rgba(255, 107, 107, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: pulse 1.5s ease-out infinite;
                    pointer-events: none;
                  `;
                  e.currentTarget.appendChild(pulse);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
                
                // Reset number animation
                const numberEl = e.currentTarget.querySelector('.stat-number');
                if (numberEl) {
                  numberEl.style.transform = 'scale(1)';
                  numberEl.style.textShadow = 'none';
                }
                
                // Remove pulse effect
                const pulse = e.currentTarget.querySelector('.pulse-effect');
                if (pulse && pulse.parentNode) {
                  pulse.parentNode.removeChild(pulse);
                }
              }}>
                <div className="stat-number" style={{ 
                  fontSize: '3rem', 
                  color: '#ff6b6b', 
                  marginBottom: '0.5rem',
                  fontWeight: '800',
                  transition: 'all 0.3s ease'
                }}>
                  30+
                </div>
                <div style={{ 
                  color: theme.textTertiary, 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'color 0.3s ease'
                }}>
                  Happy Clients
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section - 3D Skill Universe */}
        <div style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(248, 249, 250, 0.9)',
          backdropFilter: 'blur(15px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Skills Universe
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              color: theme.textSecondary,
              marginBottom: '4rem',
              maxWidth: '600px',
              margin: '0 auto 4rem'
            }}>
              Explore my technical skills floating in 3D space. Hover over each skill to see proficiency levels.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                { 
                  name: 'React.js', 
                  level: '95%', 
                  color: '#61dafb',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#61dafb">
                      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Three.js', 
                  level: '90%', 
                  color: isDarkMode ? '#ffffff' : '#000000',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill={isDarkMode ? '#ffffff' : '#000000'}>
                      <path d="M.38 0L.48 24 12 18.02 23.52 24 23.62 0 12 5.98.38 0M12 8.06L20.55 3.58 20.48 18.42 12 14.94V8.06M3.45 3.58L12 8.06V14.94L3.52 18.42 3.45 3.58Z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Node.js', 
                  level: '88%', 
                  color: '#339933',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#339933">
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                    </svg>
                  )
                },
                { 
                  name: 'TypeScript', 
                  level: '85%', 
                  color: '#3178c6',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#3178c6">
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                    </svg>
                  )
                },
                { 
                  name: 'WebGL', 
                  level: '80%', 
                  color: '#990000',
                  logo: (
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: '#990000'
                    }}>
                      GL
                    </div>
                  )
                },
                { 
                  name: 'GSAP', 
                  level: '90%', 
                  color: '#88ce02',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#88ce02">
                      <path d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,22C6.486,22,2,17.514,2,12 S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22z M16.5,8.5c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5 S17.328,8.5,16.5,8.5z M7.5,8.5C6.672,8.5,6,9.172,6,10s0.672,1.5,1.5,1.5S9,10.828,9,10S8.328,8.5,7.5,8.5z M12,6 c-0.828,0-1.5,0.672-1.5,1.5S11.172,9,12,9s1.5-0.672,1.5-1.5S12.828,6,12,6z M12,15c-0.828,0-1.5,0.672-1.5,1.5 S11.172,18,12,18s1.5-0.672,1.5-1.5S12.828,15,12,15z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Blender', 
                  level: '75%', 
                  color: '#f5792a',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#f5792a">
                      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.746 8.746 0 0 0 3.66.76 8.746 8.746 0 0 0 3.660-.76 8.227 8.227 0 0 0 2.787-2.001 7.372 7.372 0 0 0 1.593-2.757c.15-.476.25-1.084.256-1.398V9.167c-.006-.314-.106-.922-.256-1.398a7.372 7.372 0 0 0-1.593-2.757 8.227 8.227 0 0 0-2.787-2.001 8.746 8.746 0 0 0-3.66-.76 8.746 8.746 0 0 0-3.660.76 8.227 8.227 0 0 0-2.787 2.001 7.372 7.372 0 0 0-1.593 2.757c-.15.476-.25 1.084-.256 1.398z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Python', 
                  level: '82%', 
                  color: '#3776ab',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#3776ab">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.2 0-.38.09-.5.25-.12.16-.18.38-.18.61 0 .22.06.44.18.61.12.16.3.25.5.25.18 0 .35-.09.46-.25.12-.17.18-.39.18-.61 0-.23-.06-.45-.18-.61a.58.58 0 0 0-.46-.25z"/>
                    </svg>
                  )
                }
              ].map((skill, i) => (
                <div key={i} style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem 1rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) rotateX(10deg)';
                  e.currentTarget.style.borderColor = skill.color;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(${
                    skill.color === '#61dafb' ? '97, 218, 251' : 
                    skill.color === '#339933' ? '51, 153, 51' :
                    skill.color === '#3178c6' ? '49, 120, 198' :
                    skill.color === '#990000' ? '153, 0, 0' :
                    skill.color === '#88ce02' ? '136, 206, 2' :
                    skill.color === '#f5792a' ? '245, 121, 42' :
                    skill.color === '#3776ab' ? '55, 118, 171' :
                    '255, 255, 255'
                  }, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotateX(0)';
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${skill.color}`,
                    boxShadow: `0 0 20px ${skill.color}33`
                  }}>
                    {skill.logo}
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    color: theme.textPrimary,
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    {skill.name}
                  </h3>
                  <div style={{
                    fontSize: '0.9rem',
                    color: skill.color,
                    fontWeight: '700'
                  }}>
                    {skill.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section - Compact Gallery */}
        <div style={{
          padding: '4rem 2rem',
          background: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(248, 249, 250, 0.9)',
          backdropFilter: 'blur(15px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: '3rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Featured Projects
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { 
                  title: '3D E-commerce Platform', 
                  tech: 'React • Three.js • WebGL',
                  description: 'Interactive 3D product visualization with real-time customization',
                  color: '#00d4ff',
                  icon: '🛒'
                },
                { 
                  title: 'VR Portfolio Experience', 
                  tech: 'A-Frame • WebXR • Blender',
                  description: 'Immersive virtual reality portfolio using WebXR technology',
                  color: '#4ecdc4',
                  icon: '🥽'
                },
                { 
                  title: 'Interactive 3D Game', 
                  tech: 'Three.js • Socket.io • Physics',
                  description: 'Browser-based multiplayer 3D game with physics simulation',
                  color: '#ff6b6b',
                  icon: '🎮'
                }
              ].map((project, i) => (
                <div key={i} style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = project.color;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(${
                    project.color === '#00d4ff' ? '0, 212, 255' : 
                    project.color === '#4ecdc4' ? '78, 205, 196' : 
                    '255, 107, 107'
                  }, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {project.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: theme.textPrimary,
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    color: theme.textSecondary,
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {project.description}
                  </p>
                  
                  <div style={{
                    fontSize: '0.85rem',
                    color: project.color,
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                  }}>
                    {project.tech}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <button style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                      border: 'none',
                      color: 'white',
                      padding: '0.7rem 1.2rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}>
                      View Live
                    </button>
                    
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: `1px solid ${project.color}40`,
                      color: project.color,
                      padding: '0.7rem 1.2rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `${project.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}>
                      Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section - Interactive Contact Form */}
        <div style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          background: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(248, 249, 250, 0.9)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '800',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #00d4ff, #4ecdc4, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Let's Work Together
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                color: theme.textSecondary,
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Ready to bring your vision to life? Send me a message and let's create something extraordinary together.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              alignItems: 'start'
            }}>
              {/* Contact Form */}
              <div style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(25px)',
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '25px',
                padding: '3rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: theme.textPrimary,
                  marginBottom: '2rem',
                  fontWeight: '700'
                }}>
                  Send Message
                </h3>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  alert('Message sent! (This is a demo)');
                }}>
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
                    {/* Name Input */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#00d4ff',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px',
                          color: '#fff',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        placeholder="Enter your full name"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#00d4ff';
                          e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#4ecdc4',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px',
                          color: '#fff',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        placeholder="your.email@example.com"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4ecdc4';
                          e.target.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#ff6b6b',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Project Type
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px',
                          color: '#fff',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#ff6b6b';
                          e.target.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Select project type</option>
                        <option value="3d-website">3D Website Development</option>
                        <option value="webgl-app">WebGL Application</option>
                        <option value="vr-experience">VR Experience</option>
                        <option value="interactive-game">Interactive Game</option>
                        <option value="consultation">Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#ffd93d',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Message *
                      </label>
                      <textarea
                        required
                        rows="5"
                        style={{
                          width: '100%',
                          padding: '1rem 1.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px',
                          color: '#fff',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: '120px'
                        }}
                        placeholder="Tell me about your project, goals, timeline, and budget..."
                        onFocus={(e) => {
                          e.target.style.borderColor = '#ffd93d';
                          e.target.style.boxShadow = '0 0 20px rgba(255, 217, 61, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '1.2rem 2rem',
                        background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
                        border: 'none',
                        borderRadius: '15px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease',
                        marginTop: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
                        e.target.style.background = 'linear-gradient(135deg, #00d4ff, #4ecdc4, #00d4ff)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'linear-gradient(135deg, #00d4ff, #4ecdc4)';
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <div style={{
                  background: theme.cardBg,
                  backdropFilter: 'blur(25px)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '25px',
                  padding: '3rem',
                  marginBottom: '2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: theme.textPrimary,
                    marginBottom: '2rem',
                    fontWeight: '700'
                  }}>
                    Get In Touch
                  </h3>

                  <div style={{
                    display: 'grid',
                    gap: '2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        📧
                      </div>
                      <div>
                        <h4 style={{
                          color: '#00d4ff',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          fontWeight: '600'
                        }}>
                          Email
                        </h4>
                        <p style={{
                          color: theme.textSecondary,
                          margin: 0
                        }}>
                          john.doe@example.com
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #4ecdc4, #26a69a)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        📱
                      </div>
                      <div>
                        <h4 style={{
                          color: '#4ecdc4',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          fontWeight: '600'
                        }}>
                          Phone
                        </h4>
                        <p style={{
                          color: theme.textSecondary,
                          margin: 0
                        }}>
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        📍
                      </div>
                      <div>
                        <h4 style={{
                          color: '#ff6b6b',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          fontWeight: '600'
                        }}>
                          Location
                        </h4>
                        <p style={{
                          color: theme.textSecondary,
                          margin: 0
                        }}>
                          San Francisco, CA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  <button style={{
                    padding: '1rem 2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '15px',
                    color: '#00d4ff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                    e.target.style.borderColor = '#00d4ff';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }}>
                    📄 Download Resume
                  </button>
                  
                  <button style={{
                    padding: '1rem 2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                    borderRadius: '15px',
                    color: '#4ecdc4',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(78, 205, 196, 0.1)';
                    e.target.style.borderColor = '#4ecdc4';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(78, 205, 196, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }}>
                    💼 Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <Footer isDarkMode={isDarkMode} />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        /* Theme Styles */
        .dark-theme {
          --text-primary: #fff;
          --text-secondary: #b0b0b0;
          --card-bg: rgba(255, 255, 255, 0.05);
          --border-color: rgba(255, 255, 255, 0.1);
          --shadow-color: rgba(0, 0, 0, 0.3);
        }
        
        .light-theme {
          --text-primary: #333;
          --text-secondary: #666;
          --card-bg: rgba(0, 0, 0, 0.05);
          --border-color: rgba(0, 0, 0, 0.1);
          --shadow-color: rgba(0, 0, 0, 0.1);
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes loadProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        button:hover {
          transform: translateY(-3px) scale(1.02) !important;
        }
        
        .hero-btn:first-of-type:hover {
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.6) !important;
        }
        
        .hero-btn:last-of-type:hover {
          border-color: #00d4ff !important;
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.2) !important;
        }
        
        /* Mobile Navigation */
        @media (max-width: 768px) {
          nav ul {
            display: none !important;
          }
          
          nav > div {
            justify-content: space-between !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;