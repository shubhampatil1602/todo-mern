import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const dbConnection = () => {
  mongoose
    .connect(`${process.env.MONGO_CONNECTION_URI}/${DB_NAME}`)
    .then(() => console.log('MongoDb connected.'))
    .catch((err) => console.log('mongo err', err));
};

export default dbConnection;
