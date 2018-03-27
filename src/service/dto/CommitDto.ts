import AuthorDto from './AuthorDto';

export default class CommitDto {
  sha: string;
  author: AuthorDto;
  message: string;
  url: string;
};
