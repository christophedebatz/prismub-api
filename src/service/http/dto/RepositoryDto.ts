export default class RepositoryDto {

  id: number;
  name: string;
  fullName: string;
  description: string;
  owner: {
    name: string,
    pictureUrl: string
  }
  url: string;
  language: string;
  starsCount: number;

}
