import { Document } from 'mongoose';
import Commit from '../interface/Commit';

export interface CommitModel extends Commit, Document {

}
