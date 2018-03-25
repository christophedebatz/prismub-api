import { Strings } from '../../helper/strings';
import { ServiceErrorCodes } from '../../service/exception/ServiceException';

export default class ApiException {

  private hasError:boolean;

  private error: string = undefined;

  private cause: string;

  constructor(error: string, cause: string|undefined = undefined) {
    this.error = Strings.ucfirst(error);
    this.cause = cause;
    if (this.error) {
      this.hasError = true;
    }
  }

  public static fromServiceCode(code:any):ApiException {
    return new ApiException(code.name);
  }

  public static fromServiceCodeAndCause(code:any, cause:string):ApiException {
    return new ApiException(code.name, cause);
  }
}
