import DomainError from './DomainError';

export class UnAuthorizedError extends DomainError {
  protected error_name = 'notAuthorized';

  protected httpCode = 401;

  public constructor(message = 'Authorization required', error?: Error, data?: any) {
    super(message, error, data, false);
    Error.captureStackTrace(this, this.constructor);
  }
}
