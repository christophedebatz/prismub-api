import * as restify from 'restify';
import RepositoryController from '../controller/RepositoryController';
import CommitsMetricsController from '../controller/CommitsMetricsController';
import GithubRepositoryService from '../service/GithubRepositoryService';

const repositoryController = new RepositoryController(new GithubRepositoryService());
const metricsController = new CommitsMetricsController(new GithubRepositoryService());

module.exports.routes = {

  initialize: (api:restify.Server):void => {

    // handle rest resources
    // repository endpoints
    api.get('/repositories', repositoryController.search);
    api.get('/users/:userName/repositories/:repoName/commits', repositoryController.getLastCommits);

    // metrics endpoints
    api.get('/users/:userName/repositories/:repoName/metrics', metricsController.getCommitsMetrics);
  }
}
