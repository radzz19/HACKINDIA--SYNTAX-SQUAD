// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const HeaderWrapper = styled.header`
  /* Removed background property */
  background: linear-gradient(135deg, #1d1d3b 30%, #6f42c1);
  backdrop-filter: blur(10px); /* Apply blur effect for glassmorphism */
  padding: 20px 50px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  animation: ${fadeIn} 0.6s ease;
  border-radius: 10px; /* Optional: Rounded corners for a softer look */

  @media (max-width: 768px) {
    padding: 15px 30px;
  }
`;

const Logo = styled.h1`
  color: #fff; /* Primary white color for the logo */
  font-size: 28px;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  margin: 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 35px;
  list-style: none;
  margin: 0;

  @media (max-width: 768px) {
    display: none; // Hide links for mobile, use dropdown instead
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: #fff; /* Neutral dark color for text */
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff; /* White text color */
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #f0f,
      /* Purple hue for glow */ 0 0 30px #f0f, 0 0 40px #f0f, 0 0 50px #f0f,
      0 0 60px #f0f;
  }

  &.active {
    background-color: rgba(
      255,
      255,
      255,
      0.5
    ); /* Lighter background for active */
    color: #007bff;
    font-weight: 700;
    transform: translateY(-2px);
  }
`;

// Mobile Menu and Toggle
const MenuButton = styled.div`
  display: none;
  cursor: pointer;
  font-size: 28px;
  color: #007bff; /* Blue for the menu button */
  position: relative;
  z-index: 105;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 70px;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px); /* Lighter frosted glass effect */
  width: 100%;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Lighter shadow for mobile menu */
  animation: ${fadeIn} 0.4s ease-in-out;
  z-index: 104;

  & > a {
    display: block;
    margin: 15px 0;
    padding: 10px 20px;
    font-size: 18px;
    color: #333; /* Neutral dark text */
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      color: #007bff;
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.5);
      font-weight: 700;
    }
  }
`;

// Component Logic
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle menu state
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <HeaderWrapper>
      <Logo>TokenForge</Logo>
      <MenuButton onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</MenuButton>
      {/* Desktop Navigation */}
      <NavLinks>
        <NavItem>
          <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/features"
            className={location.pathname === "/features" ? "active" : ""}
          >
            Features
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/marketplace"
            className={location.pathname === "/marketplace" ? "active" : ""}
          >
            Marketplace
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </NavLink>
        </NavItem>
      </NavLinks>
      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen}>
        <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </NavLink>
        <NavLink
          to="/features"
          className={location.pathname === "/features" ? "active" : ""}
        >
          Features
        </NavLink>
        <NavLink
          to="/marketplace"
          className={location.pathname === "/marketplace" ? "active" : ""}
        >
          Marketplace
        </NavLink>
        <NavLink
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          Contact
        </NavLink>
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;
