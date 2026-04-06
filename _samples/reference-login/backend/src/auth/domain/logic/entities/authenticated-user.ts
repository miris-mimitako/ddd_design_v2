import { DisplayName } from '../value-objects/display-name';
import { EmailAddress } from '../value-objects/email-address';
import { UserId } from '../value-objects/user-id';

export class AuthenticatedUser {
  constructor(
    private readonly rawUserId: UserId,
    private readonly rawDisplayName: DisplayName,
    private readonly rawEmailAddress: EmailAddress,
  ) {}

  userId(): UserId {
    return this.rawUserId;
  }

  displayName(): DisplayName {
    return this.rawDisplayName;
  }

  emailAddress(): EmailAddress {
    return this.rawEmailAddress;
  }
}
