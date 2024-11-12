import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Ithaca's Beauty. All rights reserved.</p>
      <div className="social-media">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
