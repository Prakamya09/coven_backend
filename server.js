require('dotenv').config(); // Add at top
mongoose.connect(process.env.MONGODB_URI, { ... });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.get('/', (req, res) => res.send('Backend is running!'));

// Connect to MongoDB with fixes
mongoose.connect('mongodb://127.0.0.1:27017/coven', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => console.log('MongoDB initial connection error:', err));

// Handle errors after initial connection
mongoose.connection.on('error', err => {
  console.error('Mongoose ongoing connection error:', err);
});