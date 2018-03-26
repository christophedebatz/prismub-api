import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import GithubRepositoryService from '../service/http/GithubRepositoryService';
import RepositoryService from '../service/http/RepositoryService';
import ApiException from './exception/ApiException';
import RepositoryDto from '../service/http/dto/RepositoryDto';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class RepositoryController {

  private repositoryService:RepositoryService;

  constructor(repositoryService: RepositoryService) {
    this.repositoryService = repositoryService;
    this.search = this.search.bind(this);
  }
  /*
   * Proceed to the user login.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the repositories.
   */
  public search(req: Request, res: Response, next: Next):void {
    if (!req.query.search || req.query.search.length < 3) {
      return res.json(400, ApiException.fromServiceCode(ServiceErrorCodes.EMPTY_INVALID_INPUT));
    }
    let page = 1;
    if (req.query.page && req.query.page > 0) { // pagination is 1-based
      page = parseInt(req.query.page, 10);
    }
    this.repositoryService.findRepository(req.query.search, page)
      .then(repositories => res.json(repositories));
  }
}
