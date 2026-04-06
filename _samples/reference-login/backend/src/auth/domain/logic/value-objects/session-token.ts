export class SessionToken {
  constructor(private readonly rawValue: string) {
    if (rawValue.trim().length === 0) {
      throw new Error('SessionToken must not be empty.');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
