import {
  AuthenticationResult,
  UserAuthenticatorPort,
} from '../../../application/logic/ports/user-authenticator.port';
import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { AuthenticationDomainService } from '../../../domain/logic/services/authentication-domain.service';
import { DisplayName } from '../../../domain/logic/value-objects/display-name';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { LoggedInAt } from '../../../domain/logic/value-objects/logged-in-at';
import { PlainPassword } from '../../../domain/logic/value-objects/plain-password';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';
import { UserId } from '../../../domain/logic/value-objects/user-id';

export class SampleUserAuthenticatorAdapter implements UserAuthenticatorPort {
  private readonly authenticationDomainService = new AuthenticationDomainService();

  async authenticate(
    emailAddress: EmailAddress,
    plainPassword: PlainPassword,
  ): Promise<AuthenticationResult | null> {
    if (!this.authenticationDomainService.canAuthenticate(emailAddress, plainPassword)) {
      return null;
    }

    return {
      user: new AuthenticatedUser(
        new UserId('user-001'),
        new DisplayName('Sample User'),
        emailAddress,
      ),
      session: new LoginSession(
        new SessionToken('session-token-001'),
        new LoggedInAt('2026-04-06T09:00:00.000Z'),
      ),
    };
  }
}
