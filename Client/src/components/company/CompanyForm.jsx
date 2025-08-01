import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./CompanyForm.css"; // Import the CSS file

const CompanyForm = () => {
  const [form, setForm] = useState({ name: "", description: "", location: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/companies", form);
      alert("Company Created Successfully");
      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create company");
    }
  };

  return (
    <div className="company-form-container">
      <form className="company-form" onSubmit={handleSubmit}>
        <h2 className="company-form-title">Create Company</h2>
        {error && <p className="company-form-error">{error}</p>}
        <div className="form-group">
          <input
            name="name"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default CompanyForm;