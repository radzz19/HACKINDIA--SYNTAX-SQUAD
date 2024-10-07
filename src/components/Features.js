// src/components/Features.js
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger plugin

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

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

const FeaturesWrapper = styled.section`
  padding: 50px;
  text-align: center;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(135deg, #1d1d3b 30%, #6f42c1);
  background-size: 200% 200%;
  animation: ${waveAnimation} 10s ease infinite;
  color: white;
  overflow: hidden;
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const FeatureItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  width: 300px;
  max-width: 80%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: transparent;
    border-radius: 15px;
    z-index: -1;
    box-shadow: 0 0 10px #6f42c1, 0 0 20px #6f42c1, 0 0 30px #6f42c1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px #6f42c1, 0 0 30px #6f42c1;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const Features = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start animation when the section is 80% into view
          toggleActions: "play none none none", // Play the animation once when in view
        },
      }
    );

    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.3, // Stagger the animation for each feature item
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Trigger once 80% of the section is in view
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <FeaturesWrapper ref={sectionRef}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "40px" }}>
        Key Features of tokenFORAGE
      </h2>
      <FeatureList>
        <FeatureItem ref={(el) => (itemsRef.current[0] = el)}>
          <FeatureTitle>Tokenization of Resources</FeatureTitle>
          <FeatureDescription>
            Users can convert their computing resources into digital tokens,
            representing ownership and usage rights, making it easy to manage
            and trade resources.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem ref={(el) => (itemsRef.current[1] = el)}>
          <FeatureTitle>Decentralized Marketplace</FeatureTitle>
          <FeatureDescription>
            Peer-to-peer platform for direct transactions without
            intermediaries, utilizing smart contracts for secure and automated
            transactions.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem ref={(el) => (itemsRef.current[2] = el)}>
          <FeatureTitle>Resource Listings</FeatureTitle>
          <FeatureDescription>
            Users can list their available resources specifying details such as
            type (CPU, GPU, storage), pricing, and availability.
          </FeatureDescription>
        </FeatureItem>
      </FeatureList>
    </FeaturesWrapper>
  );
};

export default Features;
