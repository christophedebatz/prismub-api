import * as Mongo from 'mongoose';
import { DatabaseConfig } from '../types';
import { logger } from './logger';

export default class Database {

  private static _instance: Mongo.Connection;
  private static config: DatabaseConfig;

  private constructor(config: DatabaseConfig) {
    Database.config = config;
  }

  public static getInstance():Mongo.Connection {
    if (Database._instance === null) {
      const mongoUri:string = Database.getDatabaseUri();
      Database._instance = Mongo.createConnection(mongoUri)
    }
    return Database._instance;
  }

  private static getDatabaseUri():string {
    const config = Database.config;
    return `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

}
