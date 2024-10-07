import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { JsonRpcProvider, Contract } from 'ethers';
import ContractABI from "../YourContractABI.json"; // Import the ABI file
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Styled Components
const MarketplaceWrapper = styled.section`
  padding: 60px;
  text-align: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
`;

const CardList = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #ff6f91, #ff3b6d, #3bb77e, #ff3b6d) 1;
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  height: 500px;
  position: relative;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.5);
    border-image: linear-gradient(45deg, #3bb77e, #ff3b6d, #ff6f91, #3bb77e) 1;
  }
`;

const MoreDetailsButton = styled.button`
  background: linear-gradient(135deg, #3bb77e, #0bab64);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #0bab64, #3bb77e);
  }
`;

const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background: rgba(40, 40, 40, 0.9);
  backdrop-filter: blur(15px);
  color: white;
  padding: 30px;
  box-shadow: -3px 0 15px rgba(0, 0, 0, 0.7);
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.4s ease;
  z-index: 10;
  overflow-y: auto;
  border-left: 2px solid rgba(255, 111, 145, 0.2);
`;

const SidePanelContent = styled.div`
  margin-top: 60px;
  text-align: left;
`;

const SidePanelHeader = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
`;

const SidePanelActionButton = styled.button`
  background: linear-gradient(135deg, #ff6f91, #ff3b6d);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  width: 100%;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: linear-gradient(135deg, #ff3b6d, #ff6f91);
    transform: translateY(-2px);
  }
`;

const BoxWrapper = styled.div`
  height: 200px;
  margin: 20px 0;
`;

// Custom 3D Model
const CustomModel = () => {
  const meshRef = useRef();

  useEffect(() => {
    let frameId;
    const rotateModel = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.scale.x =
          1 + Math.sin(meshRef.current.rotation.y) * 0.1;
        meshRef.current.scale.y =
          1 + Math.sin(meshRef.current.rotation.y) * 0.1;
        meshRef.current.scale.z =
          1 + Math.sin(meshRef.current.rotation.y) * 0.1;
      }
      frameId = requestAnimationFrame(rotateModel);
    };
    rotateModel();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color={"#3bb77e"} wireframe />
    </mesh>
  );
};

const contractAddress = "0x0813d4a158d06784FDB48323344896B2B1aa0F85"; // Replace with your deployed contract address

const Marketplace = () => {
  const [account, setAccount] = useState(null);
  const [resources, setResources] = useState([]);
  const [resourceDetails, setResourceDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const provider = new JsonRpcProvider(
    `https://polygon-mainnet.infura.io/v3/4d15bf16e9dc4ce180bcff85a92b79a6`
  );

  const contract = new Contract(contractAddress, ContractABI, provider);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        alert("Error connecting wallet. Please try again.");
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
      console.error("MetaMask not detected.");
    }
  };

  const fetchResources = async () => {
    try {
      const resourceCount = await contract.getResourceCount();
      const fetchedResources = [];

      for (let i = 0; i < resourceCount; i++) {
        const resource = await contract.getResource(i);
        fetchedResources.push(resource);
      }

      setResources(fetchedResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchResource = async (resourceId) => {
    try {
      setLoading(true);
      const [Type, scope, price, Units, owner] = await contract.getResource(
        resourceId
      );
      setResourceDetails({ Type, scope, price, Units, owner });
      console.log("Resource details:", { Type, scope, price, Units, owner });
    } catch (error) {
      console.error("Error fetching resource details:", error);
    } finally {
      setLoading(false);
    }
  };

  const listResource = async (_Type, scope, _price, AUnits) => {
    try {
      if (!account) return connectWallet();

      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const transaction = await contractWithSigner.Enter_Token_Info(
        _Type,
        scope,
        _price,
        AUnits
      );
      await transaction.wait();
      console.log("Resource listed successfully!");
      fetchResources();
    } catch (error) {
      console.error("Error listing resource:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const data = {
    labels: ["1", 2, 3, 4, 5],
    datasets: [
      {
        label: "Price Over Time",
        data: [10, 15, 13, 17, 14],
        borderColor: "#ff6f91",
        backgroundColor: "rgba(255, 111, 145, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <MarketplaceWrapper>
      <h1>Tokenized Cloud Marketplace</h1>
      <MoreDetailsButton onClick={() => connectWallet()}>
        {account ? `Wallet Connected: ${account}` : "Connect Wallet"}
      </MoreDetailsButton>

      <CardList>
        {resources.map((resource, idx) => (
          <Card
            key={idx}
            onClick={() => {
              fetchResource(idx);
              setSelectedItem(resource);
              setIsOpen(true);
            }}
          >
            <h3>{resource.Type}</h3>
            <p>Scope: {resource.scope}</p>
            <p>Price: {resource.price}</p>
            <p>Units: {resource.Units}</p>
          </Card>
        ))}
      </CardList>

      <BoxWrapper>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <CustomModel />
          <OrbitControls />
        </Canvas>
      </BoxWrapper>

      <Line
        data={data}
        options={{
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />

      <SidePanel isOpen={isOpen}>
        <SidePanelHeader>
          <h2>{resourceDetails.Type}</h2>
        </SidePanelHeader>
        <SidePanelContent>
          <p>Scope: {resourceDetails.scope}</p>
          <p>Price: {resourceDetails.price} ETH</p>
          <p>Units Available: {resourceDetails.Units}</p>
          <p>Owner: {resourceDetails.owner}</p>

          <SidePanelActionButton onClick={() => alert("Resource rented!")}>
            Rent Resource
          </SidePanelActionButton>
          <SidePanelActionButton onClick={() => setIsOpen(false)}>
            Close
          </SidePanelActionButton>
        </SidePanelContent>
      </SidePanel>
    </MarketplaceWrapper>
  );
};

export default Marketplace;
