const express = require('express');
const app = express();
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'ec2-23-21-10-246.compute-1.amazonaws.com',
  user: 'srlvrnvhisjmov',
  password: 'ed2771efa6d9944ead5d21da84c07d687c21f8110ba1be64850ccfcf114be6e2',
  database: 'd24tagba1l73i0'
});

// Route to retrieve the Discord ID
app.get('/api/discord-id', (req, res) => {
  // Retrieve the Discord ID from the authentication process (e.g., from the request headers or session)
  const discordId = 'YOUR_DISCORD_ID';

  // Return the Discord ID as a response
  res.json({ discordId });
});

// Route to search the database based on the Discord ID
app.get('/api/search', (req, res) => {
  const { discordId } = req.query;

  // Perform the search in the MySQL database based on the Discord ID
  pool.query('SELECT * FROM your_table WHERE discord_id = ?', [discordId], (error, results) => {
    if (error) {
      console.log('An error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the search results as a response
      res.json(results);
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

