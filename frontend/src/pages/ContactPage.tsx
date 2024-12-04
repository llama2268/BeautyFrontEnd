import React, { useState } from 'react';
import './ContactPage.css';

interface Info {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [currInfo, setInfo] = useState<Info>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setInfo({ name: value, email: currInfo.email, message: currInfo.message });
    } else if (name === "email") {
      setInfo({ name: currInfo.name, email: value, message: currInfo.message });
    } else if (name === "message") {
      setInfo({ name: currInfo.name, email: currInfo.email, message: value });
    }
  };


return (
  <div className="contact-page">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <label>
          Name:
          <input type="text" name="name" value={currInfo.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={currInfo.email} onChange={handleChange} required />
        </label>

        <label>
          Message:
          <textarea name="message" rows={5} value={currInfo.message} onChange={handleChange} required />
        </label>

        <button type="submit">Send Message</button>
      </form>
  </div>
  );
};

export default ContactPage;
