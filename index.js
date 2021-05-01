import express from 'express';
import { config } from 'dotenv';
import connectDB from './utils/database'

if (process.env.NODE_ENV !== 'production') {
  config();
}

/** GENERAL SETUP */

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ROUTES */

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

/** START SERVER */
connectDB()

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
