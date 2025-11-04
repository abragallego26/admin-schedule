// backend/routes/enrollment.js

const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// POST route to submit enrollment data
router.post('/', async (req, res) => {
  try {
    const newEnrollment = new Enrollment(req.body);
    await newEnrollment.save();
    res.status(201).json({ message: 'Enrollment submitted successfully!' });
  } catch (error) {
    console.error('Error saving enrollment:', error);
    res.status(500).json({ error: 'Failed to submit enrollment' });
  }
});

module.exports = router;

const enrollmentRoutes = require('./routes/enrollment');
app.use('/api/enroll', enrollmentRoutes);
