import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// Load Routes.
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Routing.
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Paypal.
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
// Make a folder static so it can be loaded on a browser.
const __dirname = path.resolve(); // resolves __dirname with esmodules.
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
