import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db/db.js';
import usersRoute from './routers/usersRoute.router.js';
import todosRoute from './routers/todosRoute.router.js';

dotenv.config({
  path: '.env',
});

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors({ origin: '*' }));
app.use(express.json());

dbConnection();

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/todos', todosRoute);

app.listen(PORT, () => console.log(`listening http://localhost:${PORT}/`));
