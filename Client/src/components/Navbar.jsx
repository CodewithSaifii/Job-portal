import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        {token ? (
          <>
            {role === "jobseeker" && (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/saved-jobs" className="nav-link">Saved Jobs</Link>
                <Link to="/applications" className="nav-link">Applications</Link>
                <Link to="/notifications" className="nav-link">Notifications</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
              </>
            )}
            {role === "employer" && (
              <>
                <Link to="/employer/dashboard" className="nav-link">Employer Dashboard</Link>
                <Link to="/post-job" className="nav-link">Post Job</Link>
                <Link to="/company/create" className="nav-link">Create Company</Link>
              </>
            )}
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;