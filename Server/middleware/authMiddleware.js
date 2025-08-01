const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = decoded; // ✅ { _id, email, role }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
