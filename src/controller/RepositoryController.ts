import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import GithubRepositoryService from '../service/GithubRepositoryService';
import RepositoryService from '../service/RepositoryService';
import ApiException from './exception/ApiException';
import RepositoryDto from '../service/dto/RepositoryDto';
import CommitsRequestDto from '../service/dto/CommitsRequestDto';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class RepositoryController {

  private repositoryService:RepositoryService;

  constructor(repositoryService: RepositoryService) {
    this.repositoryService = repositoryService;
    this.search = this.search.bind(this);
    this.getLastCommits = this.getLastCommits.bind(this);
  }

  /*
   * Returns a list of repositories.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the found repositories.
   */
  public search(req: Request, res: Response, next: Next):void {
    if (!req.query.search || req.query.search.length < 3) {
      return res.json(400, ApiException.fromServiceCode(ServiceErrorCodes.EMPTY_INVALID_INPUT));
    }
    let page = 1;
    if (req.query.page && req.query.page > 0) { // pagination is 1-based
      page = parseInt(req.query.page, 10);
    }
    this.repositoryService.search(req.query.search, page)
      .then(repositories => res.json(repositories));
  }

  /*
   * Returns the last commits of a repository.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the last commits ordered by creation date.
   */
  public getLastCommits(req: Request, res: Response, next: Next):void {
    if (!req.body || !req.params.repoName || !req.params.userName) {
      return res.json(400, ApiException.fromServiceCode(ServiceErrorCodes.EMPTY_INVALID_INPUT));
    }
    let page:number = 1;
    if (req.query.page && req.query.page > 0) { // pagination is 1-based
      page = parseInt(req.query.page, 10);
    }
    const request:CommitsRequestDto = {
      repository: req.params.repoName,
      owner: req.params.userName,
      page
    };
    this.repositoryService.getLastCommits(request)
      .then(commits => res.json(commits));
  }

}
