import * as fs from 'fs';
import 'reflect-metadata';
import * as restify from 'restify';
import * as Cors from 'restify-cors-middleware';
import * as moment from 'moment-timezone';
import config from './config/config';
import { logger } from './service/logger';
import { Database } from './model/Database';
import authFilter from './filter/UserAuthFilter'

export const api = restify.createServer({ name: config.name});

moment.tz.setDefault("America/Paris");
Database.getInstance(); // initialize database instance

// obvioulsy just for demo, theorically origins must be the IP/domain
// of the front react server
const cors = Cors({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['*']
});

api.pre(cors.preflight);
api.use(cors.actual);
api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.fullResponse());
api.use(authFilter.authorizeUser);

fs.readdirSync(__dirname + '/route').forEach((routeFile: string): void => {
  if (routeFile.substr(-3) === '.js') {
    const routes = require(__dirname + '/route/' + routeFile).routes;
    routes.initialize(api);
  }
});

api.listen(config.port, (): void => {
  logger.info(`INFO: ${config.name} is running at ${api.url}`);
});

api.on('uncaughtException', (req, res, route, err) => {
  console.error('error = ', err);
});

api.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});
