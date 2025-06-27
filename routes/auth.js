const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await User.create(req.body);
    res.status(201).json({ message: 'A new soul has entered the Coven.' });
  } catch (err) {
    console.error("Signup Error:", err); 

    if (err.code === 11000) {
      const key = Object.keys(err.keyPattern)[0];
      const message = (key === 'username') 
        ? 'This name is already bound by another. Choose a different moniker, seeker of shadows.' 
        : 'This shadow-email already haunts our coven. Use a different spectral address.';

      res.status(409).json({ error: message });
    } else {
      res.status(500).json({ error: 'An ancient error has occurred. The darkness stirs.' });
    }
  }
});

// (Optional) Protected user listing
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, 'username email'); // Hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
