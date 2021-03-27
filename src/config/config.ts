import {Config, DatabaseConfig} from '../types';

let env = process.env.ENV || 'development';

// default development settings
let config: Config = {
  name: 'handsomegift',
  version: '1.0.0',
  port: 3001,
  env: env === 'prod' ? 'prod' : 'dev',
  database: {
    host: 'ds221339.mlab.com',
    port: 21339,
    username: 'prismus',
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
    database: 'handsomegift_test'
  }
}

// production settings
if (env === 'prod') {
  config.database = {
    host: '172.18.0.2',
    port: 3306,
    username: 'root',
    password: '',
    database: 'handsomegift'
  }
}

export default config;
