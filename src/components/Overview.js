// src/components/Overview.js
import React from "react";
import styled from "styled-components";

// Styled components
const OverviewSection = styled.section`
  padding: 50px 20px;
  background: #1d1d3b;
  color: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin: 20px 0;
`;

const SectionDescription = styled.p`
  max-width: 800px;
  margin: 0 auto;
`;

const Overview = () => {
  return (
    <OverviewSection>
      <SectionTitle>Overview</SectionTitle>
      <SectionDescription>
        tokenFORAGE is a platform that enables users to seamlessly buy, sell,
        and manage cloud computing resources through tokenization.
      </SectionDescription>
    </OverviewSection>
  );
};

export default Overview;
