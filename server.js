const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create (Book)
app.post('/api/book', async (req, res) => {
  const { name, email, date, time, service } = req.body;
  if (!name || !email || !date || !time || !service) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await db.execute(
      'INSERT INTO bookings (name, email, date, time, service) VALUES (?, ?, ?, ?, ?)',
      [name, email, date, time, service]
    );
    res.json({ success: true, message: 'Appointment booked' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
