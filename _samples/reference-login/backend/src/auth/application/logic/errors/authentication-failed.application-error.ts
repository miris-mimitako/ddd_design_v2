export class AuthenticationFailedApplicationError extends Error {
  constructor() {
    super('Authentication failed.');
  }
}
