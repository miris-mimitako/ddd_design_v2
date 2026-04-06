import { AuthenticationFailedApplicationError } from '../errors/authentication-failed.application-error';
import { UserAuthenticatorPort } from '../ports/user-authenticator.port';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { PlainPassword } from '../../../domain/logic/value-objects/plain-password';

export type LoginUserCommand = {
  readonly emailAddress: EmailAddress;
  readonly plainPassword: PlainPassword;
};

export type LoginUserResult = {
  readonly userIdText: string;
  readonly displayNameText: string;
  readonly emailAddressText: string;
  readonly sessionTokenText: string;
  readonly loggedInAtIsoText: string;
};

export class LoginUserUseCase {
  constructor(private readonly userAuthenticatorPort: UserAuthenticatorPort) {}

  async execute(command: LoginUserCommand): Promise<LoginUserResult> {
    const authenticated = await this.userAuthenticatorPort.authenticate(
      command.emailAddress,
      command.plainPassword,
    );

    if (!authenticated) {
      throw new AuthenticationFailedApplicationError();
    }

    return {
      userIdText: authenticated.user.userId().value(),
      displayNameText: authenticated.user.displayName().value(),
      emailAddressText: authenticated.user.emailAddress().value(),
      sessionTokenText: authenticated.session.sessionToken().value(),
      loggedInAtIsoText: authenticated.session.loggedInAt().value(),
    };
  }
}
