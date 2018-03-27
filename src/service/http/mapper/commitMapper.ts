import CommitDto from '../dto/CommitDto';
import AuthorDto from '../dto/AuthorDto';

const commitMapper = {

  mapThem: (items:any[]):CommitDto[] => {
    return items.map(commitMapper.mapIt);
  },

  mapIt: (item:any):CommitDto => {
    const commit:CommitDto = new CommitDto();
    if (item.sha) commit.sha = item.sha;
    if (item.author) {
      const author = item.author;
      if (author.name) commit.author.name = author.name;
      if (author.email) commit.author.email = author.email;
      if (author.date) commit.author.date = author.date;
    }
    if (item.message) commit.message = item.message;
    if (item.url) commit.url = item.url;
    return commit;
  }

}

export default commitMapper;