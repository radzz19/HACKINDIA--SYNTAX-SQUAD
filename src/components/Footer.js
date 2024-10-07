// src/components/Footer.js
import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #1d1d3b;
  padding: 30px 50px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FooterLinks = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: #ff6f91;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3b6d;
  }
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterLinks>
          <li>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </li>
          <li>
            <FooterLink href="#">Terms of Service</FooterLink>
          </li>
          <li>
            <FooterLink href="#">Contact Us</FooterLink>
          </li>
        </FooterLinks>
        <FooterText>&copy; 2024 tokenFORAGE. All rights reserved.</FooterText>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
