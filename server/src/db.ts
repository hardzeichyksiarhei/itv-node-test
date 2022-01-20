import mongoose from 'mongoose';

import config from './config';

const { MONGO_CONNECTION_STRING } = config;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {});

    console.log(`MongoDB connection open to "${MONGO_CONNECTION_STRING}"`);
  } catch (err) {
    console.log('MongoDB connection error:', err);
  }
};

export default { connectDB };
