import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import GithubRepositoryService from '../service/GithubRepositoryService';
import RepositoryService from '../service/RepositoryService';
import CommitsMetricsService from '../service/CommitsMetricsService';
import ApiException from './exception/ApiException';
import RepositoryDto from '../service/dto/RepositoryDto';
import CommitDto from '../service/dto/CommitDto';
import CommitsRequestDto from '../service/dto/CommitsRequestDto';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class CommitsMetricsController {

  private repositoryService:RepositoryService;
  private commitsMetricsService:CommitsMetricsService;

  constructor(repositoryService: RepositoryService) {
    this.repositoryService = repositoryService;
    this.commitsMetricsService = new CommitsMetricsService();
    this.getCommitsMetrics = this.getCommitsMetrics.bind(this);
  }

  /*
   * Returns the list of all user participation for the x last commits.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the found repositories.
   */
  public getCommitsMetrics(req: Request, res: Response, next: Next):void {
    if (!req.body || !req.body.repository || !req.body.owner) {
      return res.json(400, ApiException.fromServiceCode(ServiceErrorCodes.EMPTY_INVALID_INPUT));
    }
    let page:number = 1;
    if (req.query.page && req.query.page > 0) { // pagination is 1-based
      page = parseInt(req.query.page, 10);
    }
    const request:CommitsRequestDto = {
      repository: req.params.repoName,
      owner: req.params.userName,
      page: page
    }
    this.repositoryService.getLastCommits(request)
      .then(commits => res.json(this.commitsMetricsService.resolveUsersParticipations(commits)));
  }

}
