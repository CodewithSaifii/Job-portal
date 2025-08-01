import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Jobseeker Dashboard</h2>
      <h3 className="dashboard-subtitle">Choose Your Preferred Category</h3>
      <div className="category-list">
        {categories.map((c) => (
          <p key={c._id} className="category-item">{c.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;