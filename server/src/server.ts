import http from 'http';

import app from './app';
import * as db from './db';
import * as ws from './wss';

import config from './config';

const { PORT } = config;

const start = async () => {
  await db.connectDB();

  const server = http.createServer(app);
  await ws.connectWS(server);
  
  server.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
};

start();
