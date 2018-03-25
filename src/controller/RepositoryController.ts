import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import GithubRepositoryService from '../service/http/GithubRepositoryService';
import Paging from '../service/http/Paging';
import RepositoryService from '../service/http/RepositoryService';
import ApiException from './exception/ApiException';
import RepositoryDto from '../service/http/dto/RepositoryDto';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class RepositoryController {

  private static ITEMS_PER_CALL:number = 5;

  /*
   * Proceed to the user login.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the created user.
   */
  public search(req: Request, res: Response, next: Next):void {
    if (!req.query.search || req.query.search.length < 3) {
      res.json(400, ApiException.fromServiceCode(ServiceErrorCodes.EMPTY_INVALID_INPUT));
    }
    const paging:Paging = {
      offset: 0,
      limit: RepositoryController.ITEMS_PER_CALL
    };
    new GithubRepositoryService().findRepository(req.query.search, paging)
      .then(repositories => res.json(repositories));
  }
}
