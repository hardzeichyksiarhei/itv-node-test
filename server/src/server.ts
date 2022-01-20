import app from './app';

import config from './config';

const { PORT } = config;

const start = async () => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
};

start();