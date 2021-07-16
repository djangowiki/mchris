const express = require('express');
const dotenv = require('dotenv');

// Init app.
const app = express();
dotenv.config({ path: './config/env.env' });

// Custom Modules.
const connectDB = require('./config/db');

// Connect DB
connectDB();

// Create Server.
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
