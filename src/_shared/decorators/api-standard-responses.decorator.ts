// src/_shared/decorators/api-standard-responses.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodDto, ZodResponse } from 'nestjs-zod';
import { ApiCommonErrors } from './returnSwagger'; // Importe seu decorator de erros comuns

/**
 * Aplica decorators padrão do Swagger para endpoints de busca (GET).
 * @param summary A descrição da operação para o Swagger.
 * @param responseDto O DTO de resposta para o status 200.
 */

export type AnyZodDto = ZodDto<any> & { io: 'input' };

type props = {
  summary: string;
  responseDto: AnyZodDto;
  operationId?: string;
};

export function ApiStandardGetResponse({
  summary,
  responseDto,
  operationId,
}: props) {
  return applyDecorators(
    ApiOperation({ summary, operationId: operationId ?? '' }),
    ZodResponse({ status: 200, type: responseDto, description: 'Sucesso' }),
    ApiCommonErrors(), // Seus erros comuns (400, 401, 403, 404, etc.)
  );
}

/**
 * Aplica decorators padrão do Swagger para endpoints de criação (POST).
 * @param summary A descrição da operação para o Swagger.
 * @param responseDto O DTO de resposta para o status 201.
 */

type propsCreate = {
  summary: string;
  responseDto: AnyZodDto;
  operationId?: string;
};

export function ApiStandardCreateResponse({
  summary,
  responseDto,
  operationId,
}: propsCreate) {
  return applyDecorators(
    ApiOperation({ summary, operationId: operationId ?? '' }),
    ZodResponse({
      status: 201,
      type: responseDto,
      description: 'Recurso criado com sucesso',
    }),
    ApiCommonErrors(),
  );
}

/**
 * Aplica decorators padrão do Swagger para endpoints de deleção (DELETE).
 * @param summary A descrição da operação para o Swagger.
 */

type propsDelete = {
  summary: string;
  operationId?: string;
};

export function ApiStandardDeleteResponse({
  summary,
  operationId,
}: propsDelete) {
  return applyDecorators(
    ApiOperation({ summary, operationId: operationId ?? '' }),
    ApiResponse({
      status: 204,
      description: 'Recurso deletado com sucesso. Sem conteúdo de resposta.',
    }),
    ApiCommonErrors(),
  );
}

// Você pode criar outros para PATCH, PUT, etc., conforme necessário.
