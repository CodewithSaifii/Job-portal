import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure this path is correct

const Home = () => (
  <div className="home-container">
    <h1>Welcome to Job Portal</h1>
    <p>Find your dream job today!</p>
    <Link to="/jobs">Browse Jobs</Link>
  </div>
);

export default Home;