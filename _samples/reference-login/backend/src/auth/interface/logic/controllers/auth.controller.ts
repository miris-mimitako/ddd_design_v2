import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationFailedApplicationError } from '../../../application/logic/errors/authentication-failed.application-error';
import { SessionNotFoundApplicationError } from '../../../application/logic/errors/session-not-found.application-error';
import { GetCurrentUserUseCase } from '../../../application/logic/use-cases/get-current-user.usecase';
import { LoginUserUseCase } from '../../../application/logic/use-cases/login-user.usecase';
import { EmailAddress } from '../../../domain/logic/value-objects/email-address';
import { PlainPassword } from '../../../domain/logic/value-objects/plain-password';
import { SessionToken } from '../../../domain/logic/value-objects/session-token';
import { GetCurrentUserResponseDto } from '../dto/get-current-user-response.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const result = await this.loginUserUseCase.execute({
        emailAddress: new EmailAddress(dto.email),
        plainPassword: new PlainPassword(dto.password),
      });

      return {
        userId: result.userIdText,
        name: result.displayNameText,
        email: result.emailAddressText,
        sessionToken: result.sessionTokenText,
        loggedInAt: result.loggedInAtIsoText,
      };
    } catch (error) {
      if (error instanceof AuthenticationFailedApplicationError) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      throw error;
    }
  }

  @Get('me')
  async me(@Headers('x-session-token') sessionTokenText: string): Promise<GetCurrentUserResponseDto> {
    try {
      const result = await this.getCurrentUserUseCase.execute({
        sessionToken: new SessionToken(sessionTokenText),
      });

      return {
        userId: result.userIdText,
        name: result.displayNameText,
        email: result.emailAddressText,
        loggedInAt: result.loggedInAtIsoText,
      };
    } catch (error) {
      if (error instanceof SessionNotFoundApplicationError) {
        throw new UnauthorizedException('Session not found.');
      }

      throw error;
    }
  }
}
