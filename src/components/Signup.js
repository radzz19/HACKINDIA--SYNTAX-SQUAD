// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframes for background gradient animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframes for subtle scale animation of the blurred circle
const scaleAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled component for the Signup Wrapper
const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 15s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

// Styled component for the central blurred circle
const CentralBlurredCircle = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(255, 111, 145, 0.4),
    rgba(255, 59, 109, 0.3)
  );
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.7;
  z-index: 0;
  animation: ${scaleAnimation} 10s ease-in-out infinite;
`;

// Styled component for the Signup Form
const SignupForm = styled.form`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

// Styled component for the Signup Input fields
const SignupInput = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px #ff6f91;
  }
`;

// Styled component for the Signup Button
const SignupButton = styled.button`
  background: linear-gradient(135deg, #ff6f91, #ff3b6d);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.3s, background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #ff3b6d, #ff6f91);
    transform: scale(1.05);
  }
`;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Create user object
    const newUser = { username, email, password };

    // Save user to local storage
    localStorage.setItem(username, JSON.stringify(newUser));

    alert("Signup successful! Redirecting to Login...");
    navigate("/login");
  };

  return (
    <SignupWrapper>
      {/* Single Central Blurred Circle */}
      <CentralBlurredCircle />

      {/* Signup Form */}
      <SignupForm onSubmit={handleSubmit}>
        <h2 style={{ color: "white" }}>Signup</h2>
        <SignupInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <SignupInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <SignupInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SignupInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <SignupButton type="submit">Sign Up</SignupButton>
      </SignupForm>
    </SignupWrapper>
  );
};

export default Signup;
