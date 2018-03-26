import RepositoryDto from '../dto/RepositoryDto';

const branchMapper = {

  mapThem: (items:any[]):string[] => {
    return items.map(branchMapper.mapIt);
  },

  mapIt: (item:any):string => {
    if (item.ref) return item.ref.toString()
    return null;
  }

}

export default branchMapper;
