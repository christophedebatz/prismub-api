import * as restify from 'restify';
import RepositoryController from '../controller/RepositoryController';

module.exports.routes = {

  initialize: (api:restify.Server):void => {
    const repositoryController:RepositoryController = new RepositoryController();

    // handle rest resources
    api.get('/repositories', repositoryController.search);
  }
}
