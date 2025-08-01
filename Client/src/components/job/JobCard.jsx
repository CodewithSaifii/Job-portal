import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => (
  <div style={{ border: "1px solid #ddd", margin: "10px", padding: "15px" }}>
    <h3>{job.title}</h3>
    <p>{job.company?.name}</p>
    <Link to={`/jobs/${job._id}`}>View Details</Link>
  </div>
);

export default JobCard;
