import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '4rem 2rem 2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem'
            }}>
              JD
            </div>
            <p style={{
              color: '#b0b0b0',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Creative Developer & 3D Artist crafting immersive digital experiences 
              that push the boundaries of web technology.
            </p>
            
            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {[
                { name: 'GitHub', icon: '🐙', color: '#333', url: '#' },
                { name: 'LinkedIn', icon: '💼', color: '#0077b5', url: '#' },
                { name: 'Twitter', icon: '🐦', color: '#1da1f2', url: '#' },
                { name: 'Dribbble', icon: '🏀', color: '#ea4c89', url: '#' },
                { name: 'Behance', icon: '🎨', color: '#1769ff', url: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.1)';
                    e.target.style.borderColor = social.color;
                    e.target.style.boxShadow = `0 8px 25px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: '#00d4ff',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Navigation
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, i) => (
                <li key={i} style={{ marginBottom: '0.8rem' }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#00d4ff';
                      e.target.style.paddingLeft = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#b0b0b0';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{
              color: '#4ecdc4',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Services
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                '3D Web Development',
                'Interactive Experiences',
                'WebGL Applications',
                'Creative Consulting',
                'Performance Optimization'
              ].map((service, i) => (
                <li key={i} style={{ marginBottom: '0.8rem' }}>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: '1rem'
                  }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              color: '#ff6b6b',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Resources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Blog & Tutorials',
                'Code Snippets',
                'Design Assets',
                'Case Studies',
                'Tech Stack'
              ].map((resource, i) => (
                <li key={i} style={{ marginBottom: '0.8rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#ff6b6b';
                      e.target.style.paddingLeft = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#b0b0b0';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={scrollToTop}
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.1)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
            }}
          >
            ↑
          </button>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            color: '#888',
            fontSize: '0.9rem',
            margin: 0
          }}>
            © 2024 John Doe. All rights reserved.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#00d4ff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#888';
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;