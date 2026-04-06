export class UserId {
  constructor(private readonly rawValue: string) {
    if (!rawValue.startsWith('user-')) {
      throw new Error('UserId must start with "user-".');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
