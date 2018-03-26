import * as Github from '@octokit/rest';
import { SearchReposParams, AnyResponse } from '@octokit/rest';
import Commit from '../../domain/interface/Commit';
import ServiceException, { ServiceErrorCodes } from '../exception/ServiceException';
import RepositoryDto from './dto/RepositoryDto';
import CommitsRequestDto from './dto/CommitsRequestDto';
import RepositoryService from './RepositoryService';
import repositoryMapper from './mapper/repositoryMapper';
import branchMapper from './mapper/branchMapper';

export default class GithubRepositoryService implements RepositoryService {

  private static REPOSITORIES_PER_PAGE:number = 10;
  private static COMMITS_PER_PAGE:number = 100;
  private githubService:Github = new Github();

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


  public getRepositoryBranches(repository:string, owner:string):Promise<string[]> {
    const request = {
      repo: repository,
      owner,
      page: 0,
      per_page: 100
    };
    return this.githubService.repos.getBranches(request)
      .then(branches => branches.data.items ? branchMapper.mapThem(branches.data.items) : []);
  }


  public getLastCommits(requestDto:CommitsRequestDto):Promise<Commit[]> {
    if (!requestDto || !requestDto.owner || !requestDto.repository || !requestDto.ref) {
      throw ServiceException.create(
        ServiceErrorCodes.EMPTY_INVALID_INPUT,
        'invalid.repository.request'
      );
    }
    const request:Github.ReposGetCommitCommentsParams = {
      owner: requestDto.owner,
      repo: requestDto.repository,
      ref: requestDto.ref,
      page: requestDto.page,
      per_page: GithubRepositoryService.COMMITS_PER_PAGE
    };
    return this.githubService.repos.getCommits(request)
      .then(commits => commits.data.items);
  }
}
