// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import './ContactPage.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formState);
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formState.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formState.email} onChange={handleChange} required />
        </label>

        <label>
          Message:
          <textarea name="message" rows={5} value={formState.message} onChange={handleChange} required />
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
