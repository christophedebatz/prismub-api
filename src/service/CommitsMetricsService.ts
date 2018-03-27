import CommitDto from './dto/CommitDto';
import AuthorDto from './dto/AuthorDto';
import UserParticipationDto from './dto/UserParticipationDto';

export default class CommitsMetricsService {

  resolveUsersParticipations(commits: CommitDto[]):UserParticipationDto[] {
    const commitsPerUser:Map<string, CommitDto[]> = this.getCommitsPerUser(commits);
    return this.getUsersParticipation(commits, commitsPerUser);
  }

  /*
   * Returns the list of commits for each user.
   *
   * @param commits the list of commits.
   * @returns the list of commits by user.
   */
  getCommitsPerUser(commits: CommitDto[]):Map<string, CommitDto[]> {
    const usersCommits:Map<string, CommitDto[]> = new Map();
    for (let i = 0; i < commits.length; i++) {
      const userHash = commits[i].author.email + '-' + commits[i].author.email;
      const userCommitsValue = usersCommits.get(userHash);
      if (!userCommitsValue) {
        usersCommits.set(userHash, []);
      }
      userCommitsValue.push(commits[i]);
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
  getUsersParticipation(commits: CommitDto[], commitsPerUser:Map<string, CommitDto[]>):UserParticipationDto[] {
    const participations:UserParticipationDto[] = [];
    const commitsCount:number = commits.length;
    for (let [userHash, userCommits] of commitsPerUser) {
      if (userCommits && userCommits.length > 0) {
        const participation:UserParticipationDto = new UserParticipationDto();
        participation.user = userCommits[0].author;
        participation.ratio = Math.round(userCommits.length / commitsCount * 100);
        participations.push(participation);
      }
    }
    return participations;
  }
}
