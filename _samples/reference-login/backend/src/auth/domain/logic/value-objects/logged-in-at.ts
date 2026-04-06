export class LoggedInAt {
  constructor(private readonly rawValue: string) {
    if (Number.isNaN(Date.parse(rawValue))) {
      throw new Error('LoggedInAt must be ISO datetime text.');
    }
  }

  value(): string {
    return this.rawValue;
  }
}
