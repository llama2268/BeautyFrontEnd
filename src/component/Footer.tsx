import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Ithaca's Beauty. All rights reserved.</p>
      <div className="social-media">
        <a href="https://www.meta.com/" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
