// src/components/Marketplace.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ethers, JsonRpcProvider, Contract } from 'ethers';
import GPUContract from "../path/to/GPUContract.json"; // Update with your ABI path
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

// Contract details
const contractAddress = "0xB9e2A2008d3A58adD8CC1cE9c15BF6D4bB9C6d72"; // Replace with your deployed contract address
const infuraProjectId = "4d15bf16e9dc4ce180bcff85a92b79a6"; // Your Infura project ID
const provider = new JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${infuraProjectId}`);
const contract = new Contract(contractAddress, ContractABI, provider);

const Marketplace = () => {
  const [account, setAccount] = useState(null);
  const [resources, setResources] = useState([]);
  const [gpuResources, setGpuResources] = useState([]);
  const [resourceDetails, setResourceDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Form state for listing a token resource
  const [formData, setFormData] = useState({
    Type: "",
    scope: "",
    price: "",
    Units: "",
  });

  // Form state for listing a GPU resource
  const [gpuFormData, setGpuFormData] = useState({
    ram: "",
    cores: "",
    clockSpeed: "",
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Create a provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer
        contract = contract.connect(signer); // Connect the contract with the signer

        // Fetch resources after connecting the wallet
        fetchResources(); 
        fetchGpuResources(); 
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

  const fetchGpuResources = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractWithSigner = new ethers.Contract(contractAddress, GPUContract.abi, provider);
    
    try {
      const resourceCount = await contractWithSigner.getResourceCount();
      const fetchedGpuResources = [];
      for (let i = 0; i < resourceCount.toNumber(); i++) {
        const resource = await contractWithSigner.resources(i);
        fetchedGpuResources.push(resource);
      }
      setGpuResources(fetchedGpuResources);
    } catch (error) {
      console.error("Error fetching GPU resources:", error);
      alert("Error fetching resources. Please try again.");
    }
  };

  const fetchResourceDetails = async (id) => {
    const resource = await contract.getResource(id);
    setResourceDetails(resource);
    setIsOpen(true);
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tx = await contract.listResource(formData.Type, formData.scope, ethers.utils.parseEther(formData.price), formData.Units);
      await tx.wait();
      alert("Resource listed successfully!");
      fetchResources(); // Fetch updated resources
    } catch (error) {
      console.error("Error listing resource:", error);
      alert("Error listing resource. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGpuResourceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tx = await contract.listGpuResource(gpuFormData.ram, gpuFormData.cores, gpuFormData.clockSpeed);
      await tx.wait();
      alert("GPU resource listed successfully!");
      fetchGpuResources(); // Fetch updated GPU resources
    } catch (error) {
      console.error("Error listing GPU resource:", error);
      alert("Error listing GPU resource. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarketplaceWrapper>
      <h1>Marketplace</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <CardList>
        {resources.map((resource, index) => (
          <Card key={index} onClick={() => fetchResourceDetails(index)}>
            <h3>{resource.Type}</h3>
            <p>Scope: {resource.scope}</p>
            <p>Price: {ethers.utils.formatEther(resource.price)} ETH</p>
            <p>Units: {resource.Units}</p>
          </Card>
        ))}
      </CardList>

      <h2>List a Token Resource</h2>
      <form onSubmit={handleResourceSubmit}>
        <input
          type="text"
          placeholder="Type"
          value={formData.Type}
          onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Scope"
          value={formData.scope}
          onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price in ETH"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Units"
          value={formData.Units}
          onChange={(e) => setFormData({ ...formData, Units: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Listing..." : "List Resource"}
        </button>
      </form>

      <h2>GPU Resources</h2>
      <CardList>
        {gpuResources.map((gpuResource, index) => (
          <Card key={index}>
            <h3>RAM: {gpuResource.ram} GB</h3>
            <p>Cores: {gpuResource.cores}</p>
            <p>Clock Speed: {gpuResource.clockSpeed} GHz</p>
          </Card>
        ))}
      </CardList>

      <h2>List a GPU Resource</h2>
      <form onSubmit={handleGpuResourceSubmit}>
        <input
          type="text"
          placeholder="RAM (GB)"
          value={gpuFormData.ram}
          onChange={(e) => setGpuFormData({ ...gpuFormData, ram: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cores"
          value={gpuFormData.cores}
          onChange={(e) => setGpuFormData({ ...gpuFormData, cores: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Clock Speed (GHz)"
          value={gpuFormData.clockSpeed}
          onChange={(e) => setGpuFormData({ ...gpuFormData, clockSpeed: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Listing..." : "List GPU Resource"}
        </button>
      </form>

      <SidePanel isOpen={isOpen}>
        <SidePanelHeader>
          <h2>Resource Details</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </SidePanelHeader>
        <SidePanelContent>
          <p>Type: {resourceDetails.Type}</p>
          <p>Scope: {resourceDetails.scope}</p>
          <p>Price: {ethers.utils.formatEther(resourceDetails.price)} ETH</p>
          <p>Units: {resourceDetails.Units}</p>
        </SidePanelContent>
      </SidePanel>

      <BoxWrapper>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <CustomModel />
          <OrbitControls />
        </Canvas>
      </BoxWrapper>
    </MarketplaceWrapper>
  );
};

export default Marketplace;
