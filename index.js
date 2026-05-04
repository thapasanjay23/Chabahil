const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // or your DB host
  database: 'licenses_db',
  password: '2327',
  port: 5432,
});

// Search endpoint
app.get('/search', async (req, res) => {
  const { license_no } = req.query;
  try {
    const result = await pool.query(
      'SELECT name FROM licenses WHERE license_no = $1',
      [license_no]
    );
    if (result.rows.length > 0) {
      res.json({ name: result.rows[0].name });
    } else {
      res.json({ name: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Not Found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});