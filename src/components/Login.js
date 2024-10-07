import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap"; // Import GSAP

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

// Styled component for the Login Wrapper
const LoginWrapper = styled.div`
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

// Styled component for the Login Form
const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  text-align: center;
  z-index: 1;
  opacity: 0; /* Initially hidden for animation */
  transform: translateY(50px); /* Positioned below for slide-up effect */
`;

// Styled component for the Login Input fields
const LoginInput = styled.input`
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

// Styled component for the Login Button
const LoginButton = styled.button`
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
    transform: scale(1.05); /* Scale up on hover */
  }
`;

// Styled component for the Signup Link
const SignupLink = styled.p`
  margin-top: 20px;
  color: #ffffff;

  a {
    color: #ff6f91;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #ff3b6d;
    }
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const navigate = useNavigate();

  // Ref for the LoginForm to access it in GSAP animations
  const formRef = useRef(null);

  // UseEffect to trigger animations on component mount
  useEffect(() => {
    // Slide-in and fade-in animation for the form
    gsap.to(formRef.current, {
      duration: 2.4, // Increased duration for slower animation
      opacity: 1,
      y: 0,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
      // If user exists and password matches
      localStorage.setItem("username", username); // Store username
      onLogin(true); // Authenticate the user
      alert("Login successful! Redirecting to the landing page...");
      navigate("/"); // Redirect to the landing page
    } else {
      setError("Invalid credentials. Please try again."); // Handle invalid credentials
    }
  };

  return (
    <LoginWrapper>
      {/* Single Central Blurred Circle */}
      <CentralBlurredCircle />

      {/* Login Form */}
      <LoginForm ref={formRef} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
        <SignupLink>
          Don't have an account? <a href="/signup">Sign up here</a>
        </SignupLink>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
