import express from 'express';
import { config } from 'dotenv';

import connectDB from './utils/database'

import usersRoute from './routes/users'

if (process.env.NODE_ENV !== 'production') {
  config();
}

/** GENERAL SETUP */

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()

/** ROUTES */

app.use("/api/users", usersRoute)

/** START SERVER */

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
