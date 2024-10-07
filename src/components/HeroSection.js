// src/components/HeroSection.js
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap"; // Import GSAP

// Define keyframes for the wave-like gradient animation in the background
const waveAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Keyframes for the neon glow effect of the circle with purple shades
const neonGlow = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(128, 0, 128, 0.6), 0 0 30px rgba(128, 0, 128, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(128, 0, 128, 0.9), 0 0 40px rgba(128, 0, 128, 0.7);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(128, 0, 128, 0.6), 0 0 30px rgba(128, 0, 128, 0.4);
  }
`;

// Wrapper for the entire hero section with a gradient animation
const HeroSectionWrapper = styled.header`
  background: linear-gradient(135deg, #1d1d3b 30%, #6f42c1);
  background-size: 200% 200%;
  animation: ${waveAnimation} 10s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

// Styled component for a fixed neon circle
const NeonCircle = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -150px; /* Positioning the circle above the hero section */
  right: -150px; /* Positioning the circle to the right */
  z-index: 0; /* Ensure this is behind the hero content */
  pointer-events: none;
  animation: ${neonGlow} 2s ease-in-out infinite; /* Adding neon glow animation */
`;

// Content styling inside the Hero section
const HeroContent = styled.div`
  z-index: 1;
  color: #ffffff;
`;

// Keyframes for pulsing glow effect with purple shades
const pulseGlow = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(128, 0, 128, 0.6), 0 0 40px rgba(128, 0, 128, 0.8);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(128, 0, 128, 0.8), 0 0 40px rgba(128, 0, 128, 1), 0 0 50px rgba(128, 0, 128, 1);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(128, 0, 128, 0.6), 0 0 40px rgba(128, 0, 128, 0.8);
  }
`;

// Hero Title styling with glowing effect
const HeroTitle = styled.h1`
  font-size: 64px;
  letter-spacing: 2px;
  color: #ffffff;
  opacity: 0; /* Initially hidden for the animation */
  animation: ${pulseGlow} 2s ease-in-out infinite; /* Pulsing glow animation */
  transition: opacity 0.5s ease; /* Smooth transition for opacity */
`;

// Hero Description styling
const HeroDescription = styled.p`
  max-width: 600px;
  margin: 40px auto;
  text-align: justify; /* Use text-align to justify the content */
  font-size: 25px;
  color: #ffffff;
  opacity: 0; /* Initially hidden for the animation */
`;

// CTA Button styling
const CTAButton = styled.button`
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); /* Slightly transparent background for glass effect */
  border: 2px solid rgba(128, 0, 128, 0.8); /* Neon purple border */
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 20px;
  color: #ffffff; /* Text color */
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease; /* Add transition for hover effect */
  position: relative; /* Needed for the pseudo-element */
  backdrop-filter: blur(10px); /* Glass morphism effect */

  /* Neon glow effect on hover */
  &:hover {
    background-color: rgba(
      128,
      0,
      128,
      0.2
    ); /* Slight purple background on hover */
    box-shadow: 0 0 10px rgba(128, 0, 128, 1), 0 0 20px rgba(128, 0, 128, 0.5); /* Neon glow effect */
  }

  /* Pseudo-element for a glowing border effect */
  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 25px;
    border: 2px solid rgba(128, 0, 128, 0.6); /* Outer neon glow */
    opacity: 0; /* Initially hidden */
    transition: opacity 0.3s ease; /* Transition for the glow effect */
  }

  /* Show the glow effect on hover */
  &:hover:before {
    opacity: 1; /* Show the glowing border */
  }
`;

// Image container styling
const HeroAnimation = styled.div`
  max-width: 400px;
  margin-top: 30px;
  opacity: 0; /* Initially hidden for the animation */
`;

// Image styling
const HeroImage = styled.img`
  width: 100%;
`;

// Main Hero Section Component
const HeroSection = () => {
  // Create references for the elements to be animated
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  // GSAP animation on component mount
  useEffect(() => {
    const tl = gsap.timeline();

    // Fade-in animation for title, description, button, and image with stagger
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        descRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  return (
    <HeroSectionWrapper>
      {/* Neon Circle positioned like a pseudo-element */}
      <NeonCircle />

      {/* Main Hero Content */}
      <HeroContent>
        <HeroTitle ref={titleRef}>Welcome to TOKEN-FORAGE</HeroTitle>
        <HeroDescription ref={descRef}>
          Unlock Cloud Power with Tokenization ! Join our decentralized
          marketplace to effortlessly buy, sell, and manage computing resources.
        </HeroDescription>
        <CTAButton ref={buttonRef}>Get Started</CTAButton>
      </HeroContent>

      {/* Animation or image content */}
      <HeroAnimation ref={imageRef}>
        <HeroImage src="path-to-your-web3-gif.gif" alt="Web3 Animation" />
      </HeroAnimation>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
