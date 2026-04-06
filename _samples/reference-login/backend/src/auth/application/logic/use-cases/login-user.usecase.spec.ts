import { describe, expect, it } from 'vitest';
import { LoginUserUseCase } from './login-user.usecase';
import { UserAuthenticatorPort } from '../ports/user-authenticator.port';
import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { DisplayName } from '../../../domain/logic/value-objects/display-name';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { LoggedInAt } from '../../../domain/logic/value-objects/logged-in-at';
import { PlainPassword } from '../../../domain/logic/value-objects/plain-password';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';
import { UserId } from '../../../domain/logic/value-objects/user-id';

class SuccessAuthenticatorStub implements UserAuthenticatorPort {
  async authenticate() {
    return {
      user: new AuthenticatedUser(
        new UserId('user-001'),
        new DisplayName('Sample User'),
        new EmailAddress('sample.user@example.com'),
      ),
      session: new LoginSession(
        new SessionToken('session-token-001'),
        new LoggedInAt('2026-04-06T09:00:00.000Z'),
      ),
    };
  }
}

describe('LoginUserUseCase', () => {
  it('returns a DTO-friendly result after successful authentication', async () => {
    const useCase = new LoginUserUseCase(new SuccessAuthenticatorStub());

    const result = await useCase.execute({
      emailAddress: new EmailAddress('sample.user@example.com'),
      plainPassword: new PlainPassword('password123'),
    });

    expect(result.userIdText).toBe('user-001');
    expect(result.displayNameText).toBe('Sample User');
    expect(result.emailAddressText).toBe('sample.user@example.com');
  });
});
