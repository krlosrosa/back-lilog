import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const itensSchema = z.object({
  id: z.number(),
  sku: z.string(),
  descricao: z.string(),
  quantidadeCaixas: z.number().nullable(),
  quantidadeUnidades: z.number().nullable(),
  tipo: z.string(),
});

export const ResponseStartDemandaSchema = z.object({
  devolucaoItens: z.array(itensSchema),
  reentregaItens: z.array(itensSchema),
});

export class ResponseStartDemandaZodDto extends createZodDto(
  ResponseStartDemandaSchema,
) {}
