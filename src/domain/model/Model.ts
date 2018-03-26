import { Model } from 'mongoose';
import { CommitModel } from './CommitModel';
import { RepositoryModel } from './RepositoryModel'

export interface IModel {
  commit: Model<CommitModel>;
  repository: Model<RepositoryModel>;
}
