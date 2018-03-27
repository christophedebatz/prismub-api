import { Document } from 'mongoose';
import Repository from '../interface/Repository';

export interface RepositoryModel extends Repository, Document {

}
