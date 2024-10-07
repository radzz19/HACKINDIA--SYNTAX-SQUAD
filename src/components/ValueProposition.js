// src/components/ValueProposition.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ValueWrapper = styled.section`
  padding: 50px;
  text-align: center;
  min-height: 90vh;
  background: linear-gradient(135deg, #1d1d3b, #6f42c1);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ValueList = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const ValueItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  width: 250px;
  margin: 10px;
  border: 2px solid #ff6f91;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 30px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ValueTitle = styled.h3`
  font-size: 22px;
  color: #ff6f91;
`;

const ValueDescription = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const ValueProposition = () => {
  const valueItemsRef = useRef([]); // Create a ref to store the items

  useEffect(() => {
    // Animation for each ValueItem
    gsap.fromTo(
      valueItemsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3, // Stagger animations for each item
        ease: "power3.out",
        scrollTrigger: {
          trigger: valueItemsRef.current,
          start: "top 80%", // Animation starts when the section is 80% visible
        },
      }
    );
  }, []);

  return (
    <ValueWrapper>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "40px" }}>
        Our Value Proposition
      </h2>
      <ValueList>
        {["Cost Efficiency", "Transparency", "Scalability", "Security"].map(
          (title, index) => (
            <ValueItem
              key={index}
              ref={(el) => (valueItemsRef.current[index] = el)} // Assign each item to the ref
            >
              <ValueTitle>{title}</ValueTitle>
              <ValueDescription>
                {title === "Cost Efficiency" &&
                  "Optimize costs by utilizing shared resources instead of investing in expensive infrastructure."}
                {title === "Transparency" &&
                  "Use smart contracts for transparent and automated transactions with no hidden fees."}
                {title === "Scalability" &&
                  "Seamlessly scale your operations without upfront costs or complex configurations."}
                {title === "Security" &&
                  "Our platform is built on blockchain technology, ensuring secure and tamper-proof transactions."}
              </ValueDescription>
            </ValueItem>
          )
        )}
      </ValueList>
    </ValueWrapper>
  );
};

export default ValueProposition;
