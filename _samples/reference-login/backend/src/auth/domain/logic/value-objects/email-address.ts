export class EmailAddress {
  constructor(private readonly rawValue: string) {
    if (!rawValue.includes('@')) {
      throw new Error('EmailAddress must contain "@".');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
