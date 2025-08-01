import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Applications.css"; // Import the CSS file

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="applications-container container mt-4">
      <h2 className="applications-title">My Applications</h2>
      {applications.length === 0 && <p className="no-applications">No applications yet.</p>}
      {applications.map((app) => (
        <div key={app._id} className="application-card card p-3 mb-3 shadow-sm">
          <h3 className="application-title">{app.job?.title}</h3>
          <p className="application-info"><strong>Status:</strong> {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Applications;