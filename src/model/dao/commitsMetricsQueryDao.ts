import { logger } from '../../service/logger';
import { Database } from '../Database';
import CommitsMetricsQuery from '../entity/CommitsMetricsQuery';

export const commitsMetricsQueryDao = {

  /**
   * Returns a metric by its id.
   */
  getById(id:number):Promise<CommitsMetricsQuery> {
    return Database.getInstance()
      .then(async connection => {
        logger.info('Get commits-metrics-query by id', id);
        const metricsRepository = connection.getRepository(CommitsMetricsQuery);
        return await metricsRepository.findOneById(id);
      });
  },

  /**
   * Saves and returns a new metric.
   */
  saveQuery(query:CommitsMetricsQuery):Promise<CommitsMetricsQuery> {
    return Database.getInstance()
      .then(async connection => {
        logger.info('Saving new commits-metrics-query');
        const metricsRepository = connection.getRepository(CommitsMetricsQuery);
        return await metricsRepository.save(query);
      });
  }

};
