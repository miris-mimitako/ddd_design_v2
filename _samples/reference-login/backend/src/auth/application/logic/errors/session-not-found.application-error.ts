export class SessionNotFoundApplicationError extends Error {
  constructor() {
    super('Session not found.');
  }
}
