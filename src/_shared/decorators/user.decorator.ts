// account-id.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccountId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();

    // Exemplo: pegar do request que já foi populado pelo middleware/guard
    // Pode ser do accessToken decodificado ou de um header, ajuste conforme sua lógica
    return (
      request.user?.accountId ||
      request['accountId'] ||
      request['accessToken']?.accountId
    );
  },
);
