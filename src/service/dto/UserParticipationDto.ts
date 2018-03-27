import AuthorDto from './AuthorDto';

export default class UserParticipationDto {
  user:AuthorDto;
  totalCommitsCount?: number = 0;
  userCommitsCount?: number = 0;
  ratio?: number = 0.0;
}
