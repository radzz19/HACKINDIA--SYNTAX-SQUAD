// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import AudienceSlider from "./components/AudienceSlider";
import ValueProposition from "./components/ValueProposition";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Dashboard from "./components/Dashboard"; // Import Dashboard
import ContactUs from "./components/ContactUs"; // Import Contact Us
import Login from "./components/Login"; // Import Login
import Signup from "./components/Signup"; // Import Signup

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [users, setUsers] = useState([]); // State to store registered users

  const handleSignup = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Store new user credentials
    setIsAuthenticated(true); // Automatically authenticate the user
  };

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <HeroSection />
                <Features />
                <AudienceSlider />
                <ValueProposition />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} users={users} />}
        />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

        {/* Protected Routes */}
        <Route
          path="/marketplace"
          element={isAuthenticated ? <Marketplace /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />}
        />

        {/* Redirect any unknown routes to login */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
