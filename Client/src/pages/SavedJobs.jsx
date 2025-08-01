import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./SavedJobs.css"; // Import the CSS file

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await API.get("/saved-jobs");
        setSavedJobs(res.data);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="saved-jobs-container container mt-4">
      <h2 className="saved-jobs-title">Saved Jobs</h2>
      {savedJobs.length === 0 && <p className="no-saved-jobs">No saved jobs yet.</p>}
      {savedJobs.map((job) => (
        <div key={job._id} className="saved-job-card card p-3 mb-3 shadow-sm">
          <h3 className="saved-job-title">{job.title}</h3>
          <p className="saved-job-info"><strong>Location:</strong> {job.location}</p>
          <p className="saved-job-info"><strong>Salary:</strong> {job.salary}</p>
          <div className="saved-job-actions">
            <Link to={`/jobs/${job._id}`} className="btn btn-primary">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;