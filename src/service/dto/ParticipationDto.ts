import UserParticipationDto from './UserParticipationDto';

export default class ParticipationDto {

  constructor(commitsCount:number) {
    this.commitsCount = commitsCount;
  }

  commitsCount?: number = 0;
  details:UserParticipationDto[] = [];
}
