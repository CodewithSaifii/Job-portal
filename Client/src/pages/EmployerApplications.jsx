import React, { useEffect, useState } from "react";
import API from "../services/api";

const EmployerApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const res = await API.get(`/applications/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApplications(res.data);
    };
    fetchApps();
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setApplications(applications.map(app =>
      app._id === id ? { ...app, status } : app
    ));
  };

  return (
    <div>
      <h2>Applications</h2>
      {applications.map(app => (
        <div key={app._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>{app.applicant.name}</b> - {app.status}</p>
          <p>{app.coverLetter}</p>
          {app.status === "pending" && (
            <>
              <button onClick={() => handleStatusChange(app._id, "accepted")}>Accept</button>
              <button onClick={() => handleStatusChange(app._id, "rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployerApplications;
