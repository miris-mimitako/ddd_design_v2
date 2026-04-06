import { AuthenticatedUser } from '../../../domain/logic/entities/authenticated-user';
import { LoginSession } from '../../../domain/logic/entities/login-session';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';

export type CurrentUserSession = {
  readonly user: AuthenticatedUser;
  readonly session: LoginSession;
};

export const SessionReaderPortToken = Symbol('SessionReaderPort');

export interface SessionReaderPort {
  findByToken(sessionToken: SessionToken): Promise<CurrentUserSession | null>;
}
