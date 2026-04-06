import { SessionNotFoundApplicationError } from '../errors/session-not-found.application-error';
import { SessionReaderPort } from '../ports/session-reader.port';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';

export type GetCurrentUserQuery = {
  readonly sessionToken: SessionToken;
};

export type GetCurrentUserResult = {
  readonly userIdText: string;
  readonly displayNameText: string;
  readonly emailAddressText: string;
  readonly loggedInAtIsoText: string;
};

export class GetCurrentUserUseCase {
  constructor(private readonly sessionReaderPort: SessionReaderPort) {}

  async execute(query: GetCurrentUserQuery): Promise<GetCurrentUserResult> {
    const currentUserSession = await this.sessionReaderPort.findByToken(query.sessionToken);

    if (!currentUserSession) {
      throw new SessionNotFoundApplicationError();
    }

    return {
      userIdText: currentUserSession.user.userId().value(),
      displayNameText: currentUserSession.user.displayName().value(),
      emailAddressText: currentUserSession.user.emailAddress().value(),
      loggedInAtIsoText: currentUserSession.session.loggedInAt().value(),
    };
  }
}
