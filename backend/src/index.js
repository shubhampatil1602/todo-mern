import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db/db.js';

dotenv.config({
  path: './env',
});

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 3002, () =>
      console.log(`http://localhost:${process.env.PORT}/`)
    );
  })
  .catch((err) => console.log(`Mongo connection fail, ${err}`));
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
