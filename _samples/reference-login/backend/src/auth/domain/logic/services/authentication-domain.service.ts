import { EmailAddress } from '../value-objects/email-address';
import { PlainPassword } from '../value-objects/plain-password';

export class AuthenticationDomainService {
  canAuthenticate(emailAddress: EmailAddress, plainPassword: PlainPassword): boolean {
    return (
      emailAddress.value() === 'sample.user@example.com' &&
      plainPassword.value() === 'password123'
    );
  }
}
