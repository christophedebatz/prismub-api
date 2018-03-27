import AuthorDto from './AuthorDto';

export default class UserParticipationDto {
  user:AuthorDto;
  commitsCount?: number = 0;
  ratio?: number = 0.0;
}
