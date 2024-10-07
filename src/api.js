// src/api.js
import axios from "axios";

const API_BASE_URL = "http://your-backend-url/api"; // Replace with your backend URL

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login`, credentials);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register`, userData);
};

export const fetchResources = async () => {
  return await axios.get(`${API_BASE_URL}/resources`);
};

export const createTransaction = async (transactionData) => {
  return await axios.post(`${API_BASE_URL}/transactions`, transactionData);
};
