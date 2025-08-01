import React, { useState, useEffect } from "react";
import API from "../../services/api";

const JobForm = ({ onJobCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    company: "",
  });

  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await API.get("/categories");
        setCategories(cats.data);
        const comps = await API.get("/companies");
        setCompanies(comps.data);
      } catch (err) {
        console.error("Error fetching categories/companies", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/jobs", form);
      alert("Job created successfully!");
      if (onJobCreated) onJobCreated(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create Job</h2>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="company" value={form.company} onChange={handleChange}>
        <option value="">Select Company</option>
        {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit">Post Job</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "400px",
    margin: "20px auto",
  },
};

export default JobForm;
