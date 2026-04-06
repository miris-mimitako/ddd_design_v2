export class PlainPassword {
  constructor(private readonly rawValue: string) {
    if (rawValue.length < 8) {
      throw new Error('PlainPassword must be at least 8 characters.');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
