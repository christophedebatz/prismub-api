import RepositoryDto from '../dto/RepositoryDto';

const repositoryMapper = {

  mapThem: (items:any[]):RepositoryDto[] => {
    return items.map(repositoryMapper.mapIt);
  },

  mapIt: (item:any):RepositoryDto => {
    const dto:RepositoryDto = new RepositoryDto();
    if (item.id) dto.id = item.id;
    if (item.name) dto.name = item.name;
    if (item.fullName) dto.fullName = item.fullName;
    if (item.description) dto.description = item.description;
    if (item.language) dto.language = item.language;
    if (item.stargazers_count) dto.starsCount = item.stargazers_count;
    if (item.url) dto.url = item.url;
    if (item.owner) {
      const owner = item.owner;
      dto.owner = {
        name: owner.login ? owner.login : undefined,
        pictureUrl: owner.avatar_url ? owner.avatar_url : undefined
      };
    }
    return dto;
  }

}

export default repositoryMapper;
