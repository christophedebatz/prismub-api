import * as Github from '@octokit/rest';
import { SearchReposParams, AnyResponse } from '@octokit/rest';
import RepositoryDto from './dto/RepositoryDto';
import RepositoryService from './RepositoryService';
import repositoryMapper from './mapper/repositoryMapper';

export default class GithubRepositoryService implements RepositoryService {

  private static ITEMS_PER_PAGE:number = 10;

  public findRepository(search:string, page:number):Promise<RepositoryDto[]> {
    if (!search) {
      return Promise.resolve([]);
    }
    const request:SearchReposParams = {
      q: search.trim(),
      sort: 'stars',
      order: 'desc',
      per_page: GithubRepositoryService.ITEMS_PER_PAGE,
      page
    };
    return new Github().search.repos(request)
      .then(res => res.data.items ? repositoryMapper.mapThem(res.data.items) : []);
  }
}
