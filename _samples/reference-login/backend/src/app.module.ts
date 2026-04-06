import { Module } from '@nestjs/common';
import { SessionReaderPort } from './auth/application/logic/ports/session-reader.port';
import { GetCurrentUserUseCase } from './auth/application/logic/use-cases/get-current-user.usecase';
import { LoginUserUseCase } from './auth/application/logic/use-cases/login-user.usecase';
import { SessionReaderPortToken } from './auth/application/logic/ports/session-reader.port';
import { UserAuthenticatorPort } from './auth/application/logic/ports/user-authenticator.port';
import { UserAuthenticatorPortToken } from './auth/application/logic/ports/user-authenticator.port';
import { AuthController } from './auth/interface/logic/controllers/auth.controller';
import { InMemorySessionReaderAdapter } from './auth/infrastructure/logic/adapters/in-memory-session-reader.adapter';
import { SampleUserAuthenticatorAdapter } from './auth/infrastructure/logic/adapters/sample-user-authenticator.adapter';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: UserAuthenticatorPortToken,
      useClass: SampleUserAuthenticatorAdapter,
    },
    {
      provide: SessionReaderPortToken,
      useClass: InMemorySessionReaderAdapter,
    },
    {
      provide: LoginUserUseCase,
      inject: [UserAuthenticatorPortToken],
      useFactory: (userAuthenticatorPort: UserAuthenticatorPort) =>
        new LoginUserUseCase(userAuthenticatorPort),
    },
    {
      provide: GetCurrentUserUseCase,
      inject: [SessionReaderPortToken],
      useFactory: (sessionReaderPort: SessionReaderPort) =>
        new GetCurrentUserUseCase(sessionReaderPort),
    },
  ],
})
export class AppModule {}
