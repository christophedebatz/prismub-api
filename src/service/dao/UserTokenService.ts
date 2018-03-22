import Mongo = require('mongoose');
import { UserToken } from '../../domain/interface/UserToken';
import { UserTokenSchema } from '../../domain/schema/UserTokenSchema';
import { UserTokenModel } from '../../domain/model/UserTokenModel';
import { logger } from '../logger';

export default class UserTokenService {

  private userTokenRepository:Mongo.Model<UserTokenModel>;

  constructor(connection:Mongo.Connection) {
    global.Promise = require('q').Promise;
    Mongo.Promise = global.Promise;

    this.userTokenRepository = connection.model<UserTokenModel>(
      'UserToken',
      UserTokenSchema
    );
  }

  save(userToken: UserToken) {
    return new this.userTokenRepository(userToken).save()
      .catch(logger.error);
  }

  // getLastUserTokens(itemsCount:?number = 5) {
  //
  // }

}
