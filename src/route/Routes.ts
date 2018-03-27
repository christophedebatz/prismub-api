import * as restify from 'restify';
import RepositoryController from '../controller/RepositoryController';
import GithubRepositoryService from '../service/http/GithubRepositoryService';

const repositoryController = new RepositoryController(new GithubRepositoryService());

module.exports.routes = {

  initialize: (api:restify.Server):void => {

    // handle rest resources
    api.get('/repositories', repositoryController.search);
    api.get('/repositories/{name}/{owner}/commits', repositoryController.getLastCommits);
  }
}
