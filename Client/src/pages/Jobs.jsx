import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Jobs.css"; // Ensure this path is correct

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleSaveJob = async (jobId) => {
    try {
      await API.post(`/saved-jobs/${jobId}`);
      alert("Job saved successfully!");
    } catch (err) {
      alert("Error saving job: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="jobs-container container mt-4">
      <h2 className="jobs-title">Available Jobs</h2>
      {jobs.length === 0 && <p className="no-jobs">No jobs available.</p>}
      {jobs.map((job) => (
        <div
          key={job._id}
          className="job-card card p-3 mb-3 shadow-sm"
        >
          <h4 className="job-title">{job.title}</h4>
          <p className="job-info"><strong>Location:</strong> {job.location}</p>
          <p className="job-info"><strong>Salary:</strong> {job.salary}</p>
          <div className="job-actions">
            <Link to={`/jobs/${job._id}`} className="btn btn-primary me-2">
              View Details
            </Link>
            <button onClick={() => handleSaveJob(job._id)} className="btn btn-outline-success">
              Save Job
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;