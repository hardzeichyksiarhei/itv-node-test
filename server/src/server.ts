import app from './app';
import db from './db';

import config from './config';

const { PORT } = config;

const start = async () => {
  await db.connectDB();

  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
};

start();
