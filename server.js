const express = require('express');
const dotenv = require('dotenv');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');

// Init app.
const app = express();
dotenv.config({ path: './config/env.env' });

// Custom Modules.
const connectDB = require('./config/db');
const limiter = require('./middlewares/limitRequests');
const auth = require('./routes/auth');
const errorHandler = require('./middlewares/error');

// Connect DB
connectDB();

// Middlewares.
app.use(hpp());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Custom Middlewares.
app.use(limiter);
app.use('/api/v1/auth', auth);
app.use(errorHandler);

// Create Server.
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
