import { describe, expect, it } from 'vitest';
import { AuthenticationDomainService } from './authentication-domain.service';
import { EmailAddress } from '../value-objects/email-address';
import { PlainPassword } from '../value-objects/plain-password';

describe('AuthenticationDomainService', () => {
  it('authenticates only the allowed sample credential', () => {
    const service = new AuthenticationDomainService();

    expect(
      service.canAuthenticate(
        new EmailAddress('sample.user@example.com'),
        new PlainPassword('password123'),
      ),
    ).toBe(true);

    expect(
      service.canAuthenticate(
        new EmailAddress('sample.user@example.com'),
        new PlainPassword('wrong-pass'),
      ),
    ).toBe(false);
  });
});
