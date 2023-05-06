import config from '../config';
import { Sequelize, Options } from 'sequelize';

const { host, name, username, password, port } = config.get('postgresDatabase');
const databaseOptions: Options = {
  host,
  port: port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false // set to true if using SSL
  },
  define: {
    timestamps: true,
    freezeTableName: true
  },
  logQueryParameters: true,

};

const sequelize = new Sequelize(name, username, password, databaseOptions);

export { sequelize };