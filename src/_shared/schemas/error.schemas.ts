// src/common/schemas/error.schemas.ts

import { z } from 'zod';

// Um schema base para campos que se repetem em todos os erros.
const baseErrorSchema = z.object({
  statusCode: z.number().int(),
  path: z.string().url(),
  timestamp: z.string().datetime(),
});

// Schema para o Erro 400 (Bad Request)
// Inclui um campo "issues" para detalhar os erros de validação do Zod.
const validationIssueSchema = z.object({
  code: z.string(),
  path: z.array(z.string().or(z.number())),
  message: z.string(),
});

export const error400Schema = baseErrorSchema.extend({
  statusCode: z.number().int().default(400),
  error: z.literal('Bad Request'),
  message: z.literal('Validation failed'),
  issues: z.array(validationIssueSchema).optional(),
});

// Schema para o Erro 401 (Unauthorized)
export const error401Schema = baseErrorSchema.extend({
  statusCode: z.number().int().default(401),
  error: z.literal('Unauthorized'),
  message: z.string().default('Credenciais inválidas ou token ausente.'),
});

// Schema para o Erro 403 (Forbidden)
export const error403Schema = baseErrorSchema.extend({
  statusCode: z.number().int().default(403),
  error: z.literal('Forbidden'),
  message: z
    .string()
    .default('Você não tem permissão para acessar este recurso.'),
});

// Schema para o Erro 404 (Not Found)
export const error404Schema = baseErrorSchema.extend({
  statusCode: z.number().int().default(404),
  error: z.literal('Not Found'),
  message: z.string().default('O recurso solicitado não foi encontrado.'),
});

// Schema para o Erro 500 (Internal Server Error)
export const error500Schema = baseErrorSchema.extend({
  statusCode: z.number().int().default(500),
  error: z.literal('Internal Server Error'),
  message: z.literal('Ocorreu um erro inesperado no servidor.'),
});
