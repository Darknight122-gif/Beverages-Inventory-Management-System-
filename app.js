require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const beverageRoutes = require('./routes/beverageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Beverages Inventory API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/beverages', beverageRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Beverages Inventory API running on http://localhost:${PORT}`);
});
