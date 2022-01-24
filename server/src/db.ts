import mongoose from 'mongoose';

import config from './config';

const { MONGO_CONNECTION_STRING } = config;

import Connection from './resources/connections/connection.schema';
import Message from './resources/messages/message.schema';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {});

    console.log(`MongoDB connection open to "${MONGO_CONNECTION_STRING}"`);
  } catch (err) {
    console.log('MongoDB connection error:', err);
  }
};

export const models = { Connection, Message };
