const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRouters');
const applicationRoutes = require('./routes/applicationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const savedJobRoutes = require('./routes/savedjobRouters');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection and routes
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    // ✅ Root route (for Render health check)
    app.get("/", (req, res) => {
      res.json({ status: "success", message: "Job Portal Backend is running 🚀" });
    });

    // ✅ API routes
    app.use('/api/users', userRoutes);
    app.use('/api/companies', companyRoutes);
    app.use('/api/jobs', jobRoutes);
    app.use('/api/applications', applicationRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/notifications', notificationRoutes);
    app.use('/api/saved-jobs', savedJobRoutes);

    // Start server after DB is connected
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
