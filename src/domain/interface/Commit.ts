export default interface Commit {
  message: string;
  userName: string;
  userEmail: string;
  repositoryId: number;
  createdAt: Date;
}
