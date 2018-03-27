import CommitDto from './dto/CommitDto';
import AuthorDto from './dto/AuthorDto';
import UserParticipationDto from './dto/UserParticipationDto';
import ParticipationDto from './dto/ParticipationDto';
import CommitsRequestDto from './dto/CommitsRequestDto';
import { commitsMetricsQueryDao } from '../model/dao/commitsMetricsQueryDao';
import CommitsMetricsQuery from '../model/entity/CommitsMetricsQuery';

export default class CommitsMetricsService {

  /*
   * Returns the participation after saving the metrics query.
   *
   * @param commits the list of commits.
   * @param request the request for retrieving commits.
   * @returns the participation object.
   */
  public retrieveMetricsAndSaveQuery(commits: CommitDto[], request:CommitsRequestDto):Promise<ParticipationDto> {
    const participation:ParticipationDto = this.resolveParticipation(commits);
    return this.saveMetricsQuery(request)
      .then(queryId => {
        participation.id = queryId;
        return participation;
      });
  }

  /*
   * Returns the participation.
   *
   * @param commits the list of commits.
   * @returns the participation object.
   */
  private resolveParticipation(commits: CommitDto[]):ParticipationDto {
    const commitsPerUser:Map<string, CommitDto[]> = this.getCommitsPerUser(commits);
    return this.getUsersParticipation(commits, commitsPerUser);
  }

  /*
   * Saves and returns the metrics query.
   *
   * @param requestDto the metrics query request dto.
   * @returns the id of the created metrics query.
   */
  public saveMetricsQuery(requestDto:CommitsRequestDto): Promise<number> {
    const query:CommitsMetricsQuery = new CommitsMetricsQuery();
    query.owner = requestDto.owner;
    query.repository = requestDto.repository;
    return commitsMetricsQueryDao.saveQuery(query)
      .then(query => query.id);
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
      const userHash:string = `${commit.author.email}/${commit.author.email}`;
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
