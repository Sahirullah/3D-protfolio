import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Footer from './sections/Footer';
import './index.css';

// Navigation Component
function Navbar() {
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
      background: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
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
                color: '#b0b0b0',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00d4ff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b0b0b0';
              }}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

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
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
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
  return (
    <div className="App" style={{ background: '#000' }}>
      {/* Navigation Header */}
      <Navbar />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <fog attach="fog" args={['#000', 8, 30]} />
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
            color: '#b0b0b0',
            marginBottom: '2rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Creative Developer & 3D Artist
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#888',
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
            color: '#666',
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
          background: 'rgba(0, 0, 0, 0.8)',
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
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#00d4ff',
                  marginBottom: '1rem'
                }}>
                  🎨 Creative Vision
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  lineHeight: '1.7'
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
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#4ecdc4',
                  marginBottom: '1rem'
                }}>
                  ⚡ Technical Excellence
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  lineHeight: '1.7'
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
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#00d4ff', 
                  marginBottom: '0.5rem',
                  fontWeight: '800'
                }}>
                  50+
                </div>
                <div style={{ 
                  color: '#888', 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
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
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#4ecdc4', 
                  marginBottom: '0.5rem',
                  fontWeight: '800'
                }}>
                  5+
                </div>
                <div style={{ 
                  color: '#888', 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
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
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#ff6b6b', 
                  marginBottom: '0.5rem',
                  fontWeight: '800'
                }}>
                  30+
                </div>
                <div style={{ 
                  color: '#888', 
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
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
          background: 'rgba(0, 0, 0, 0.9)',
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
              color: '#b0b0b0',
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
                  color: '#ffffff',
                  logo: (
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#ffffff">
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'rgba(255, 255, 255, 0.1)',
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
                    color: '#fff',
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

        {/* Projects Section - Enhanced 3D Gallery */}
        <div style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 30, 0.9) 50%, rgba(0, 0, 0, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Animated Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #00d4ff33, transparent)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #4ecdc433, transparent)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}></div>

          <div style={{
            maxWidth: '1400px',
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Enhanced Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '5rem'
            }}>
              <div style={{
                fontSize: '1rem',
                color: '#00d4ff',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginBottom: '1rem',
                opacity: '0.8'
              }}>
                Featured Work
              </div>
              <h2 style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #00d4ff 0%, #4ecdc4 30%, #ff6b6b 60%, #ffd93d 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 6s ease-in-out infinite',
                textShadow: '0 0 60px rgba(0, 212, 255, 0.3)'
              }}>
                Project Showcase
              </h2>
              <p style={{
                fontSize: '1.3rem',
                color: '#b0b0b0',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.7',
                fontWeight: '300'
              }}>
                Explore my latest creations where cutting-edge technology meets creative innovation. 
                Each project represents a unique journey in 3D web development.
              </p>
            </div>
            
            {/* Enhanced Project Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              {[
                { 
                  title: '3D E-commerce Platform', 
                  subtitle: 'Next-Gen Shopping Experience',
                  tech: ['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'],
                  description: 'Revolutionary e-commerce platform featuring interactive 3D product visualization, real-time customization, and immersive shopping experiences that increase conversion rates by 300%.',
                  color: '#00d4ff',
                  gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)',
                  icon: '🛒',
                  status: 'Live Project',
                  year: '2024'
                },
                { 
                  title: 'VR Portfolio Experience', 
                  subtitle: 'Immersive Virtual Reality',
                  tech: ['A-Frame', 'WebXR', 'Blender', 'JavaScript', 'GSAP'],
                  description: 'Groundbreaking VR portfolio experience using WebXR technology, allowing clients to explore work in virtual reality directly from their browser without any downloads.',
                  color: '#4ecdc4',
                  gradient: 'linear-gradient(135deg, #4ecdc4, #26a69a)',
                  icon: '🥽',
                  status: 'Award Winner',
                  year: '2024'
                },
                { 
                  title: 'Interactive 3D Game', 
                  subtitle: 'Multiplayer Physics Engine',
                  tech: ['Three.js', 'Socket.io', 'Cannon.js', 'Express', 'Redis'],
                  description: 'Browser-based multiplayer 3D game featuring advanced physics simulation, real-time networking, and cross-platform compatibility with mobile and desktop.',
                  color: '#ff6b6b',
                  gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                  icon: '🎮',
                  status: 'Open Source',
                  year: '2023'
                }
              ].map((project, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '30px',
                  padding: '0',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-20px) scale(1.02)';
                  e.currentTarget.style.borderColor = project.color;
                  e.currentTarget.style.boxShadow = `0 30px 60px rgba(${
                    project.color === '#00d4ff' ? '0, 212, 255' : 
                    project.color === '#4ecdc4' ? '78, 205, 196' : 
                    '255, 107, 107'
                  }, 0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}>
                  {/* Project Header with Icon */}
                  <div style={{
                    background: project.gradient,
                    padding: '2.5rem 2.5rem 1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Animated Background Pattern */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                   radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                      opacity: 0.6
                    }}></div>
                    
                    <div style={{
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          fontSize: '3rem',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                        }}>
                          {project.icon}
                        </div>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'white',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {project.status}
                        </div>
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.8rem',
                        color: 'white',
                        marginBottom: '0.5rem',
                        fontWeight: '800',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {project.title}
                      </h3>
                      
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div style={{
                    padding: '2.5rem'
                  }}>
                    <p style={{
                      color: '#c0c0c0',
                      lineHeight: '1.7',
                      marginBottom: '2rem',
                      fontSize: '1rem'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div style={{
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Tech Stack
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.8rem'
                      }}>
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} style={{
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                            border: `1px solid ${project.color}40`,
                            color: project.color,
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            backdropFilter: 'blur(10px)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <button style={{
                          background: project.gradient,
                          border: 'none',
                          color: 'white',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = `0 8px 20px ${project.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}>
                          View Live
                        </button>
                        
                        <button style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: `1px solid ${project.color}40`,
                          color: project.color,
                          padding: '0.8rem 1.5rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = `${project.color}20`;
                          e.target.style.borderColor = project.color;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.borderColor = `${project.color}40`;
                        }}>
                          Source Code
                        </button>
                      </div>
                      
                      <div style={{
                        color: '#888',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {project.year}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div style={{
              textAlign: 'center',
              marginTop: '4rem'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
                border: 'none',
                color: 'white',
                padding: '1.2rem 3rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: '0 15px 35px rgba(0, 212, 255, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
              }}>
                View All Projects
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section - 3D Interaction Zone */}
        <div style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Let's Create Something Extraordinary
            </h2>
            
            <p style={{
              fontSize: '1.3rem',
              color: '#b0b0b0',
              marginBottom: '4rem',
              lineHeight: '1.6'
            }}>
              Ready to bring your vision to life with cutting-edge 3D technology? 
              Let's discuss your next project and create something amazing together.
            </p>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '25px',
              padding: '3rem',
              marginBottom: '3rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  textAlign: 'left'
                }}>
                  <h3 style={{
                    color: '#00d4ff',
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                  }}>
                    📧 Email
                  </h3>
                  <p style={{
                    color: '#b0b0b0'
                  }}>
                    john.doe@example.com
                  </p>
                </div>
                
                <div style={{
                  textAlign: 'left'
                }}>
                  <h3 style={{
                    color: '#4ecdc4',
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                  }}>
                    📱 Phone
                  </h3>
                  <p style={{
                    color: '#b0b0b0'
                  }}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '1.5rem 3rem',
                background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: '0 15px 35px rgba(0, 212, 255, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
              }}>
                Start a Project
              </button>
              
              <button style={{
                padding: '1.5rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.borderColor = '#00d4ff';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}>
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
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