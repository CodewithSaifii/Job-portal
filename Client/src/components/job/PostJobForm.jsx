import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./PostJobForm.css"; // Import the CSS file

const PostJobForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    category: "",
    company: "",
    deadline: "",
  });

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compRes = await API.get("/companies");
        setCompanies(compRes.data);
        const catRes = await API.get("/categories");
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", form);
      alert("Job Posted Successfully");
      navigate("/employer/dashboard");
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="post-job-container">
      <form className="post-job-form" onSubmit={handleSubmit}>
        <h2 className="post-job-title">Post a New Job</h2>
        <div className="form-group">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
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
          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group">
          <select
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Company</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default PostJobForm;