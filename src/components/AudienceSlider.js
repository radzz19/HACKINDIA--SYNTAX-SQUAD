import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

// Styled Components (same as your previous ones)
const SliderWrapper = styled.section`
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

const SliderContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  padding: 0 40px;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.4s ease-in-out;
`;

const SlideItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  margin: 10px;
  flex: 0 0 300px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 30px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    flex: 0 0 90%;
  }

  @media (max-width: 480px) {
    flex: 0 0 100%;
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ff6f91;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  z-index: 1;

  &:hover {
    background: #ff3b6d;
  }
`;

const PrevButton = styled(SliderButton)`
  left: 10px;
`;

const NextButton = styled(SliderButton)`
  right: 10px;
`;

const AudienceSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null); // Reference to the entire section
  const items = [
    {
      title: "Freelancers and Developers",
      description: "Individuals needing temporary computing power.",
    },
    {
      title: "Small to Medium Enterprises (SMEs)",
      description: "Cost-effective solutions for scaling operations.",
    },
    {
      title: "Data Scientists and Researchers",
      description: "Resources for data analysis and modeling.",
    },
    {
      title: "Cloud Resource Providers",
      description: "Monetize excess computing capacity.",
    },
  ];

  // GSAP Animation for Slide In/Out
  const animateSlides = () => {
    gsap.fromTo(
      sliderRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  };

  // Handle next slide logic
  const handleNext = () => {
    if (currentIndex === items.length - 1) {
      setCurrentIndex(0); // Reset to the first slide
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    animateSlides();
  };

  // Handle previous slide logic
  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(items.length - 1); // Go to the last slide
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
    animateSlides();
  };

  // Trigger GSAP animation when the component comes into view
  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSlides(); // Start animation when the section is in view
          }
        });
      },
      {
        threshold: 0.2, // Start animation when 20% of the section is in view
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []); // Only run once

  // Set transform to move the slides
  useEffect(() => {
    sliderRef.current.style.transform = `translateX(-${currentIndex * 300}px)`; // Adjust 300px to the width of your SlideItem
  }, [currentIndex]);

  return (
    <SliderWrapper ref={sectionRef}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "40px" }}>
        Target Audience
      </h2>
      <SliderContainer>
        <PrevButton onClick={handlePrev}>&#10094;</PrevButton>
        <Slider ref={sliderRef}>
          {items.map((item, index) => (
            <SlideItem key={index}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "1.2rem" }}>{item.description}</p>
            </SlideItem>
          ))}
        </Slider>
        <NextButton onClick={handleNext}>&#10095;</NextButton>
      </SliderContainer>
    </SliderWrapper>
  );
};

export default AudienceSlider;
