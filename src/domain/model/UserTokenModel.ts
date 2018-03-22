import { Document } from 'mongoose';
import { UserToken } from '../interface/UserToken';

export interface UserTokenModel extends UserToken, Document {

}
