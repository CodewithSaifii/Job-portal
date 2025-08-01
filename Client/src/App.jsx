import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Pages for Jobseeker
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import Categories from "./pages/Categories";
import SavedJobs from "./pages/SavedJobs";
import Notifications from "./pages/Notifications";
import Applications from "./pages/Applications";

// Auth
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";

// User Profile
import UserProfile from "./components/user/UserProfile"; 

// Employer specific
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicantsList from "./pages/ApplicantsList";
import CompanyForm from "./components/company/CompanyForm";
import PostJobForm from "./components/job/PostJobForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/categories" element={<Categories />} />

        {/* Jobseeker Protected Routes */}
        <Route
          path="/profile-setup"
          element={
            <PrivateRoute>
              <UserProfile /> {/* Profile setup as UserProfile */}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/saved-jobs"
          element={
            <PrivateRoute>
              <SavedJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <PrivateRoute>
              <Applications />
            </PrivateRoute>
          }
        />

        {/* Employer Protected Routes */}
        <Route
          path="/employer/dashboard"
          element={
            <PrivateRoute>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:jobId/applicants"
          element={
            <PrivateRoute>
              <ApplicantsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <PrivateRoute>
              <PostJobForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/company/create"
          element={
            <PrivateRoute>
              <CompanyForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
