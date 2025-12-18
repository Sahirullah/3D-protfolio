import React from 'react';

const Footer = ({ isDarkMode = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme colors for footer
  const theme = {
    background: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(248, 249, 250, 0.95)',
    textPrimary: isDarkMode ? '#fff' : '#333',
    textSecondary: isDarkMode ? '#b0b0b0' : '#666',
    textTertiary: isDarkMode ? '#888' : '#999',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    cardBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    iconBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    iconBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };

  return (
    <footer style={{
      background: theme.background,
      backdropFilter: 'blur(30px)',
      borderTop: `1px solid ${theme.border}`,
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
              color: theme.textSecondary,
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
                { 
                  name: 'GitHub', 
                  color: '#333', 
                  url: '#',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
                { 
                  name: 'LinkedIn', 
                  color: '#0077b5', 
                  url: '#',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Twitter', 
                  color: '#1da1f2', 
                  url: '#',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Dribbble', 
                  color: '#ea4c89', 
                  url: '#',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Behance', 
                  color: '#1769ff', 
                  url: '#',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 7.5v9c0 .825.675 1.5 1.5 1.5h21c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-21c-.825 0-1.5.675-1.5 1.5zm22.5 0v9h-21v-9h21zm-20.25 1.5v6h3.75c1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25h-1.5v-1.5h-2.25zm2.25 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm6.75-3v6h3.75c1.24 0 2.25-1.01 2.25-2.25 0-.621-.252-1.183-.659-1.591.407-.408.659-.97.659-1.591 0-1.24-1.01-2.25-2.25-2.25h-3.75zm2.25 1.5h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm0 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm6-4.5v1.5h3v-1.5h-3zm0 3v1.5h2.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.25z"/>
                    </svg>
                  )
                }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  style={{
                    width: '45px',
                    height: '45px',
                    background: theme.iconBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.iconBorder}`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b0b0b0',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.1)';
                    e.target.style.borderColor = social.color;
                    e.target.style.boxShadow = `0 8px 25px ${social.color}40`;
                    e.target.style.color = social.color;
                    e.target.style.background = `${social.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.color = theme.textSecondary;
                    e.target.style.background = theme.iconBg;
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
                      color: theme.textSecondary,
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
                      e.target.style.color = theme.textSecondary;
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
                  <a
                    href="#"
                    style={{
                      color: theme.textSecondary,
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#4ecdc4';
                      e.target.style.paddingLeft = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = theme.textSecondary;
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    {service}
                  </a>
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
                      color: theme.textSecondary,
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
                      e.target.style.color = theme.textSecondary;
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
            color: theme.textTertiary,
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
                  color: theme.textTertiary,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#00d4ff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = theme.textTertiary;
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