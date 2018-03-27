import * as Github from '@octokit/rest';
import { SearchReposParams, AnyResponse } from '@octokit/rest';
import ServiceException, { ServiceErrorCodes } from '../exception/ServiceException';
import RepositoryDto from './dto/RepositoryDto';
import CommitDto from './dto/CommitDto';
import CommitsRequestDto from './dto/CommitsRequestDto';
import RepositoryService from './RepositoryService';
import repositoryMapper from './mapper/repositoryMapper';
import branchMapper from './mapper/branchMapper';
import commitMapper from './mapper/commitMapper';

export default class GithubRepositoryService implements RepositoryService {

  private static readonly REPOSITORIES_PER_PAGE:number = 10;
  private static readonly COMMITS_PER_PAGE:number = 100;
  private githubService:Github = new Github();

  /*
   * Returns a list of repositories.
   *
   * @param search the search input as a string.
   * @param res the number of data page.
   * @returns the found Github repositories.
   */
  public search(search:string, page:number):Promise<RepositoryDto[]> {
    if (!search) {
      throw ServiceException.create(
        ServiceErrorCodes.EMPTY_INVALID_INPUT,
        'empty.search'
      );
    }
    const request:Github.SearchReposParams = {
      q: search.trim(),
      sort: 'stars',
      order: 'desc',
      per_page: GithubRepositoryService.REPOSITORIES_PER_PAGE,
      page
    };
    return this.githubService.search.repos(request)
      .then(repos => repos.data.items ? repositoryMapper.mapThem(repos.data.items) : []);
  }

  /*
   * Returns the last commits of a Github repository.
   *
   * @param requestDto  the commits list request.
   * @returns the last commits ordered by creation date.
   */
  public getLastCommits(requestDto:CommitsRequestDto):Promise<CommitDto[]> {
    if (!requestDto || !requestDto.owner || !requestDto.repository || !requestDto.ref) {
      throw ServiceException.create(
        ServiceErrorCodes.EMPTY_INVALID_INPUT,
        'invalid.repository.request'
      );
    }
    const request:Github.ReposGetCommitsParams = {
      owner: requestDto.owner,
      repo: requestDto.repository,
      page: 0,
      per_page: GithubRepositoryService.COMMITS_PER_PAGE
    };
    return this.githubService.repos.getCommits(request)
      .then(commits => commits.data.items ? commitMapper.mapThem(commits.data.items) : []);
  }
}
