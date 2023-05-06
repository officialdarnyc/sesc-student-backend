import convict from 'convict';

const config = convict({

  port: {
    arg: 'port',
    default: 8000,
    doc: 'The port to bind',
    env: 'APP_PORT',
    format: 'port'
  },
  baseUrl: {
    default: 'https://localhost',
    doc: 'App base url',
    env: 'BASE_URL',
    nullable: true,
    format: String
  },

  postgresDatabase: {
    host: {
      default: 'localhost',
      doc: 'Postgres database host name/IP',
      env: 'POSTGRES_DATABASE_HOST',
      format: '*'
    },
    port: {
      default: 5432,
      doc: 'Postgres database server port',
      env: 'POSTGRES_DATABASE_PORT',
      format: 'port'
    },
    name: {
      default: 'Records',
      doc: 'Postgres database name',
      env: 'POSTGRES_DATABASE_NAME',
      nullable: false,
      format: String
    },
    username: {
      default: 'postgres',
      doc: 'Postgres database username',
      env: 'POSTGRES_DATABASE_USERNAME',
      nullable: false,
      format: String
    },
    password: {
      doc: 'Postgres database password',
      env: 'POSTGRES_DATABASE_PASSWORD',
      format: String,
      nullable: true,
      default: '',
      sensitive: true
    },
    showLogs: {
      default: true,
      doc: 'To determine whether to show Postgres database logs',
      env: 'POSTGRES_DATABASE_SHOW_LOGS',
      format: Boolean
    }
  },
  

});

// Perform validation
config.validate({ allowed: 'strict' });

export default config;
