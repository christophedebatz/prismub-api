import RepositoryDto from './dto/RepositoryDto';
import Paging from './Paging';

export default interface RepositoryService {

  findRepository(search:string, paging:Paging):Promise<RepositoryDto[]>;

}
