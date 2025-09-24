import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv/kh4ee8EQTWTLUuCIdyGQn0ypQkZd/cGSCvBxz718nVDx4KsJBKidJdlET6seO1Jfku+eASgGeYKBZl9ZwIByCPIoWDLxqPJshWpnb5Fm/u9kC7qE78+Ym3RjJMJ4WG72Q9WukG0FMvibKQgdrIZBog7oCaKofNBOLvULOrxaLXZEk6bjlSOeSu9crYJnkJYXZOcKETS13cKRfuDTg15NdSWxRHTndRtUCh02gTcejCM4LG9VJxUtGh7wn3ukdyUhbQusBzJNHRk6aUS1F2lrKON6gsBP6LZIkGDRNQDu/5qd2yySG3X7117s3df0biQxKQ2sGz0eQ3dnCdtu7xjQIDAQAB
-----END PUBLIC KEY-----`;

    try {
      const payload: KeycloakTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          algorithms: ['RS256'],
          publicKey: key,
        },
      );
      request['accountId'] = payload.preferred_username;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

interface KeycloakTokenPayload {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string | string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: Record<string, { roles: string[] }>;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
