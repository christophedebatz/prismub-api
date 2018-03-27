import RepositoryDto from './dto/RepositoryDto';
import CommitsRequestDto from './dto/CommitsRequestDto';
import CommitDto from './dto/CommitDto';

export default interface RepositoryService {

  search(search:string, page:number):Promise<RepositoryDto[]>;

  getLastCommits(requestDto:CommitsRequestDto):Promise<CommitDto[]>

}
