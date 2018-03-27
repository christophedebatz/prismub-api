import {Config, DatabaseConfig} from '../types';

let env = process.env.ENV || 'dev';

// default development settings
let config: Config = {
  name: 'prismub-api',
  version: '1.0.0',
  port: 3001,
  env: env === 'prod' ? 'prod' : 'dev',
  database: {
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '',
    database: 'prismub'
  }
};

// test settings
if (env === 'test') {
  config.database = {
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '',
    database: 'prismub_test'
  }
}

// production settings
if (env === 'prod') {
  config.database = {
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '',
    database: 'prismub'
  }
}

export default config;
