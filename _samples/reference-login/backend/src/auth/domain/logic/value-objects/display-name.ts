export class DisplayName {
  constructor(private readonly rawValue: string) {
    if (rawValue.trim().length === 0) {
      throw new Error('DisplayName must not be empty.');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
