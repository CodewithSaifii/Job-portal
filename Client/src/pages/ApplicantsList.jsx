import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/my");
        console.log("API Response:", res.data);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="employer-dashboard-container container mt-4">
      <h2 className="employer-dashboard-title">Employer Dashboard</h2>
      <div className="employer-dashboard-actions">
        <Link to="/company/create" className="btn btn-primary me-2">Create Company</Link>
        <Link to="/post-job" className="btn btn-primary">Post New Job</Link>
      </div>
      <h3 className="employer-jobs-title">Your Posted Jobs</h3>
      {error && <p className="employer-error">{error}</p>}
      {jobs.length === 0 && !error && <p className="no-jobs">No jobs posted yet.</p>}
      {jobs.map((job) => (
        <div key={job._id} className="employer-job-card card p-3 mb-3 shadow-sm">
          <h4 className="employer-job-title">{job.title}</h4>
          <p className="employer-job-info"><strong>Location:</strong> {job.location}</p>
          <p className="employer-job-info"><strong>Salary:</strong> {job.salary}</p>
          <div className="employer-job-actions">
            <Link to={`/jobs/${job._id}/applicants`} className="btn btn-primary">View Applicants</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployerDashboard;