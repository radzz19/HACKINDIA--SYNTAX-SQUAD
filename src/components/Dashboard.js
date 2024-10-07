import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
import { FaHome, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Updated import

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Styled components for the Dashboard (same as before)
const DashboardWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #0d1b2a;
  color: white;
  font-family: "Arial", sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1b263b;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const SidebarHeader = styled.h2`
  color: #00bfff;
  margin-bottom: 20px;
  text-align: center;
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const OptionIcon = styled.span`
  margin-right: 10px;
`;

const MainArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.h2`
  margin-bottom: 40px;
  color: #00bfff;
  text-align: center;
`;

const Greeting = styled.h2`
  color: #ff69b4;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Card = styled.div`
  background: #1b263b;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
  width: 100%;
  max-width: 250px;
  margin: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 15px;
  color: #ff69b4;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const BarChartWrapper = styled.div`
  max-width: 400px;
  flex: 1;
  margin: 20px;
`;

const PieChartWrapper = styled.div`
  max-width: 400px;
  flex: 1;
  margin: 20px;
`;

const WalletBalance = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Footer = styled.footer`
  text-align: center;
  color: #aaa;
  margin-top: 20px;
`;

const TokenList = styled.div`
  margin-top: 30px;
`;

const TokenItem = styled.div`
  background: #1b263b;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SettingsContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #1b263b;
  border-radius: 10px;
`;

const SettingsTitle = styled.h2`
  text-align: center;
  color: #00bfff;
`;

const SettingItem = styled.div`
  margin-bottom: 15px;
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [viewSettings, setViewSettings] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      const userData = JSON.parse(localStorage.getItem(username));
      if (userData) {
        setUser(userData);
      }
    }

    const fetchTokens = () => {
      const mockTokens = [
        { name: "NFT 1", price: "$10", balance: 1 },
        { name: "FT 1", price: "$5", balance: 50 },
        { name: "NFT 2", price: "$15", balance: 2 },
      ];
      setTokens(mockTokens);
    };

    fetchTokens();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null);
    window.location.reload();
  };

  const handleSettings = () => {
    setViewSettings(!viewSettings);
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <DashboardWrapper>
      <Sidebar>
        <SidebarHeader>TokenForge</SidebarHeader>
        <SidebarOption onClick={() => navigate("/")}>
          <OptionIcon>
            <FaHome />
          </OptionIcon>
          Home
        </SidebarOption>
        <SidebarOption onClick={handleSettings}>
          <OptionIcon>
            <FaCogs />
          </OptionIcon>
          Settings
        </SidebarOption>
        <SidebarOption onClick={handleLogout}>
          <OptionIcon>
            <FaSignOutAlt />
          </OptionIcon>
          Logout
        </SidebarOption>
      </Sidebar>
      <MainArea>
        {viewSettings ? (
          <SettingsContainer>
            <SettingsTitle>User Settings</SettingsTitle>
            {user ? (
              <>
                <SettingItem>
                  <strong>Username:</strong> {user.username}
                </SettingItem>
                <SettingItem>
                  <strong>Email:</strong> {user.email}
                </SettingItem>
                <SettingItem>
                  <strong>Account Created:</strong> {user.createdAt}
                </SettingItem>
              </>
            ) : (
              <p>Loading user information...</p>
            )}
          </SettingsContainer>
        ) : (
          <>
            {user ? (
              <>
                <Greeting>Good Morning, {user.username}!</Greeting>
                <InfoCards>
                  <Card>
                    <CardTitle>User Email</CardTitle>
                    <p>{user.email}</p>
                  </Card>
                  <Card>
                    <CardTitle>Account Created</CardTitle>
                    <p>{user.createdAt}</p>
                  </Card>
                </InfoCards>
                <WalletBalance>
                  <h3>Wallet Balance</h3>
                  <p>Your current balance: $500</p>
                </WalletBalance>
                <TokenList>
                  <h3>My Tokens</h3>
                  {tokens.map((token, index) => (
                    <TokenItem key={index}>
                      <span>{token.name}</span>
                      <span>Price: {token.price}</span>
                      <span>Balance: {token.balance}</span>
                    </TokenItem>
                  ))}
                </TokenList>
                <ChartWrapper>
                  <BarChartWrapper>
                    <Bar data={barData} />
                  </BarChartWrapper>
                  <PieChartWrapper>
                    <Pie data={pieData} />
                  </PieChartWrapper>
                </ChartWrapper>
              </>
            ) : (
              <p>Loading user information...</p>
            )}
          </>
        )}
        <Footer>&copy; 2024 TokenForge. All rights reserved.</Footer>
      </MainArea>
    </DashboardWrapper>
  );
};

export default Dashboard;
