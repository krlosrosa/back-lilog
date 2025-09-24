import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { Error400Dto } from '../dtos/error.dtos';
import { Error401Dto } from '../dtos/error.dtos';
import { Error403Dto } from '../dtos/error.dtos';
import { Error404Dto } from '../dtos/error.dtos';
import { Error500Dto } from '../dtos/error.dtos';

interface ErrorResponse {
  status: number;
  description: string;
  type?: Type<any>;
}
export function ApiCommonErrors(errors?: ErrorResponse[]) {
  // erros padrão caso nenhum seja passado
  const defaultErrors: any[] = [
    ZodResponse({
      status: 400,
      type: Error400Dto,
      description: 'Erro de validação nos dados enviados.',
    }),
    ZodResponse({
      status: 401,
      type: Error401Dto,
      description: 'Acesso não autorizado. Token inválido ou ausente.',
    }),
    ZodResponse({
      status: 403,
      type: Error403Dto,
      description: 'Acesso negado. O usuário não tem permissão.',
    }),
    ZodResponse({
      status: 404,
      type: Error404Dto,
      description: 'O recurso solicitado não foi encontrado.',
    }),
    ZodResponse({
      status: 500,
      type: Error500Dto,
      description: 'Erro interno do servidor.',
    }),
  ];

  const errorList = errors ?? defaultErrors;

  return applyDecorators(
    ...errorList.map((error) => {
      if (error.type) {
        // Se quiser modelar o schema do erro com DTO
        return ApiResponse({
          status: error.status,
          description: error.description,
          schema: { $ref: getSchemaPath(error.type) },
        });
      }
      return ApiResponse({
        status: error.status,
        description: error.description,
      });
    }),
  );
}
