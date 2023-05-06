import { Server } from 'http';
import { logger } from '../utils/logger';

export const normalizePort = (val: string | number): number => {
  const port = parseInt(val.toString(), 10);
  if (isNaN(port)) {
    return Number(val);
  }

  if (port >= 0) {
    return port;
  }

  return 3000;
};

export const gracefulShutdown = (server: Server, message?: string): void => {
  try {
    if (message) logger.info(message);
    // await sequelize.close();
    // logger.info('Closed database connection!');

    server.close();
    process.exit();
  } catch (error: any) {
    logger.info(error.message);
    process.exit(1);
  }
};

export const onListening = (server: Server): void => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;
  logger.info(`App listening on ${bind}`);
};

export const handleError = (error: any, port: number): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
