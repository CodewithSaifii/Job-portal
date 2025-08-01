import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./EmployerDashboard.css"; // Import the CSS file

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
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
      {jobs.length === 0 && <p className="no-jobs">No jobs posted yet.</p>}
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