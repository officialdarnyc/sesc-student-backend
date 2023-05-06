/* eslint-disable */
require('dotenv/config');

const databaseConfig = {
  host: process.env.POSTGRES_DATABASE_HOST,
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  port: Number(process.env.POSTGRES_DATABASE_PORT),
  dialect: 'postgres',
  define: {
    timestamps: true,
    freezeTableName: true
  },
  logQueryParameters: true,
  logging: (str) => {
    return process.env.MYSQL_DATABASE_SHOW_LOGS === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
  }
};

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig
  },
  staging: {
    ...databaseConfig
  },
  production: {
    ...databaseConfig,
    logging: false
  }
};
