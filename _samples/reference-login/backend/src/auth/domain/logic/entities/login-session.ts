import { LoggedInAt } from '../value-objects/logged-in-at';
import { SessionToken } from '../value-objects/session-token';

export class LoginSession {
  constructor(
    private readonly rawSessionToken: SessionToken,
    private readonly rawLoggedInAt: LoggedInAt,
  ) {}

  sessionToken(): SessionToken {
    return this.rawSessionToken;
  }

  loggedInAt(): LoggedInAt {
    return this.rawLoggedInAt;
  }
}
