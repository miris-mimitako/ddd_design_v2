import { describe, expect, it } from 'vitest';
import { GetCurrentUserUseCase } from './get-current-user.usecase';
import { SessionReaderPort } from '../ports/session-reader.port';
import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { DisplayName } from '../../../domain/logic/value-objects/display-name';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { LoggedInAt } from '../../../domain/logic/value-objects/logged-in-at';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';
import { UserId } from '../../../domain/logic/value-objects/user-id';

class SessionReaderStub implements SessionReaderPort {
  async findByToken() {
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

describe('GetCurrentUserUseCase', () => {
  it('returns the current user from the session port', async () => {
    const useCase = new GetCurrentUserUseCase(new SessionReaderStub());

    const result = await useCase.execute({
      sessionToken: new SessionToken('session-token-001'),
    });

    expect(result.userIdText).toBe('user-001');
    expect(result.emailAddressText).toBe('sample.user@example.com');
  });
});
