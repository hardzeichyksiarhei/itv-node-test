import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const { NODE_ENV, PORT, MONGO_CONNECTION_STRING } = process.env;

const config = {
  NODE_ENV,
  PORT: PORT ?? 5000,
  MONGO_CONNECTION_STRING: MONGO_CONNECTION_STRING ?? '',
};

export default config;
