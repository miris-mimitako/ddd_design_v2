import { CurrentUserSession, SessionReaderPort } from '../../../application/logic/ports/session-reader.port';
import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { DisplayName } from '../../../domain/logic/value-objects/display-name';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { LoggedInAt } from '../../../domain/logic/value-objects/logged-in-at';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';
import { UserId } from '../../../domain/logic/value-objects/user-id';

export class InMemorySessionReaderAdapter implements SessionReaderPort {
  async findByToken(sessionToken: SessionToken): Promise<CurrentUserSession | null> {
    if (sessionToken.value() !== 'session-token-001') {
      return null;
    }

    return {
      user: new AuthenticatedUser(
        new UserId('user-001'),
        new DisplayName('Sample User'),
        new EmailAddress('sample.user@example.com'),
      ),
      session: new LoginSession(
        sessionToken,
        new LoggedInAt('2026-04-06T09:00:00.000Z'),
      ),
    };
  }
}
