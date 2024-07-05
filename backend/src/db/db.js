import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_CONNECTION_URI}/${DB_NAME}`);
    console.log(`DB connected`);
  } catch (error) {
    console.log('MongoDB err', error);
  }
};

export default dbConnection;
