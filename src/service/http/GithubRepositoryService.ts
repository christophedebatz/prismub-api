import * as Github from '@octokit/rest';
import { SearchReposParams, AnyResponse } from '@octokit/rest';
import RepositoryDto from './dto/RepositoryDto';
import RepositoryService from './RepositoryService';
import repositoryMapper from './mapper/repositoryMapper';
import Paging from './Paging';

export default class GithubRepositoryService implements RepositoryService {

  findRepository(search:string, paging:Paging):Promise<RepositoryDto[]> {
    if (!search) {
      return Promise.resolve([]);
    }
    const request:SearchReposParams = {
      q: search.trim(),
      sort: 'stars',
      order: 'desc',
      per_page: paging.limit,
      page: Math.ceil(paging.offset / paging.limit)
    };
    return new Github().search.repos(request)
      .then(res => res.data.items ? repositoryMapper.mapThem(res.data.items) : []);
  }
}
