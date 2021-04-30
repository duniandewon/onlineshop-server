import express from 'express';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/**
 * ----------------- GENERAL SETUP ------------------------
 */

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ----------------- ROUTES ------------------------
 */

/**
 * ----------------- START SERVER ------------------------
 */

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
