import logger from 'morgan';
import express from 'express';
import { config } from 'dotenv';

import connectDB from './utils/database';

import usersRoute from './routes/users';
import authRoute from './routes/auth';
import productsRoute from './routes/products';
import cartsRoute from './routes/carts';

if (process.env.NODE_ENV !== 'production') {
	config();
}

/** GENERAL SETUP */

const app = express();

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

/** ROUTES */

app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);

app.use('*', (req, res) => res.status(404).json({ msg: '404: Page not found' }));

export default app;
