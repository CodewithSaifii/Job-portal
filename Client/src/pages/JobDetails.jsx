import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./JobDetails.css"; // Import the CSS file

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await API.post("/applications", { jobId: id });
      alert("Applied successfully!");
    } catch (err) {
      alert("Error applying: " + (err.response?.data?.error || err.message));
    }
  };

  const handleSave = async () => {
    try {
      await API.post(`/saved-jobs/${id}`);
      alert("Job saved!");
    } catch (err) {
      alert("Error saving job: " + (err.response?.data?.error || err.message));
    }
  };

  if (!job) return <p className="loading">Loading...</p>;

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <h2 className="job-details-title">{job.title}</h2>
        <p className="job-details-info"><strong>Description:</strong> {job.description}</p>
        <p className="job-details-info"><strong>Location:</strong> {job.location}</p>
        <p className="job-details-info"><strong>Salary:</strong> {job.salary}</p>
        <div className="job-details-actions">
          <button onClick={handleApply} className="btn btn-primary">
            Apply
          </button>
          <button onClick={handleSave} className="btn btn-outline-success">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;