import { Model } from 'mongoose';
import { UserTokenModel } from './UserTokenModel';
import { CommitModel } from './CommitModel';
import { RepositoryModel } from './RepositoryModel'

export interface IModel {
  token: Model<UserTokenModel>;
  commit: Model<CommitModel>;
  repository: Model<RepositoryModel>;
}
