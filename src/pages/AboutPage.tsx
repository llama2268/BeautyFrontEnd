// src/pages/AboutPage.tsx
import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <section className="about-content">
        <p>
          Welcome to <strong>Celestique</strong>! We are committed to bringing you the best in beauty products and services.
        </p>
        <p>
          Our mission is to empower individuals to express their unique beauty through our carefully curated selection of products.
        </p>
        <p>
          With a passion for innovation and excellence, we strive to provide an unparalleled shopping experience.
        </p>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h3>Paul Hwang</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>Ian Urquhartt</h3>
            <p>Chief Beauty Officer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
