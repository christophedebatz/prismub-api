import CommitDto from './dto/CommitDto';
import AuthorDto from './dto/AuthorDto';
import UserParticipationDto from './dto/UserParticipationDto';
import ParticipationDto from './dto/ParticipationDto';

export default class CommitsMetricsService {

  private static readonly UNKNOW_USER_KEY = '@Unknow/Unknow';

  public resolveParticipation(commits: CommitDto[]):ParticipationDto {
    const commitsPerUser:Map<string, CommitDto[]> = this.getCommitsPerUser(commits);
    return this.getUsersParticipation(commits, commitsPerUser);
  }

  /*
   * Returns the list of commits for each user.
   *
   * @param commits the list of commits.
   * @returns the list of commits by user.
   */
  private getCommitsPerUser(commits: CommitDto[]):Map<string, CommitDto[]> {
    const usersCommits:Map<string, CommitDto[]> = new Map();
    for (let commit of commits) {
      if (!commit.author) {
        commit.author = new AuthorDto();
        commit.author.email = 'anonym@dev.net';
        commit.author.name = 'Anonym developer';
      }
      const userHash:string = `${commit.author.name}/${commit.author.email}`;
      const userCommits:CommitDto[] = usersCommits.get(userHash);
      if (!userCommits) {
        usersCommits.set(userHash, [commit]);
      } else {
        userCommits.push(commit);
      }
    }
    return usersCommits;
  }

  /*
   * Returns a list of repositories.
   *
   * @param commits the global list of commits for the repository.
   * @param commitsPerUser the list of commits for each user.
   * @returns the list of participation for each user who made a commit.
   */
  private getUsersParticipation(commits: CommitDto[], commitsPerUser:Map<string, CommitDto[]>):ParticipationDto {
    const commitsCount:number = commits.length;
    const participationDto:ParticipationDto = new ParticipationDto(commitsCount);
    for (let [userHash, userCommits] of commitsPerUser) {
      const userCommitsCount:number = userCommits.length;
      if (userCommits && userCommitsCount > 0) {
        const participation = new UserParticipationDto();
        participation.user = userCommits[0].author;
        participation.commitsCount = userCommitsCount;
        participation.ratio = Math.round((userCommitsCount / commitsCount * 100) * 100) / 100;
        participationDto.details.push(participation);
      }
    }
    return participationDto;
  }
}
