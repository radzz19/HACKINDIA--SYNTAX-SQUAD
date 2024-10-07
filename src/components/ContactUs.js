// src/components/ContactUs.js
import React, { useState } from "react";
import styled from "styled-components";

const ContactWrapper = styled.section`
  padding: 50px;
  text-align: center;
  background: #282c34;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 300px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #ff6f91;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff3b6d;
  }
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <ContactWrapper>
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Send Message</Button>
      </Form>
    </ContactWrapper>
  );
};

export default ContactUs;
