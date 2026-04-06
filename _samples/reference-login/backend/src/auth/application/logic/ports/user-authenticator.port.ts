import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { PlainPassword } from '../../../domain/logic/value-objects/plain-password';

export type AuthenticationResult = {
  readonly user: AuthenticatedUser;
  readonly session: LoginSession;
};

export const UserAuthenticatorPortToken = Symbol('UserAuthenticatorPort');

export interface UserAuthenticatorPort {
  authenticate(email: EmailAddress, password: PlainPassword): Promise<AuthenticationResult | null>;
}
