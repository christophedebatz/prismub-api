import RepositoryDto from './dto/RepositoryDto';
import CommitsRequestDto from './dto/CommitsRequestDto';
import Commit from '../../domain/interface/Commit';

export default interface RepositoryService {

  search(search:string, page:number):Promise<RepositoryDto[]>;

  getRepositoryBranches(repository:string, owner:string):Promise<string[]>;

  getLastCommits(requestDto:CommitsRequestDto):Promise<Commit[]>

}
