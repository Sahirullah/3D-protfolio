import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Let's work together on your next project
          </p>
          <button className="cta-button primary">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;