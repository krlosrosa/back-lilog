import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const demandasNaoIniciadas = z.array(
  z.object({
    id: z.string(),
    status: z.string(),
    criadoEm: z.string(),
    empresa: z.string(),
    quantidadeCaixas: z.number(),
    quantidadeUnidades: z.number(),
    quantidadePaletes: z.number(),
    enderecoVisitado: z.number(),
    segmento: z.string(),
    transporteId: z.string(),
    tipoProcesso: z.string(),
    atualizadoEm: z.string(),
    demandaId: z.number().nullable(),
    validado: z.boolean(),
    criadoPorId: z.string(),
    dataExpedicao: z.string(),
  }),
);

export class DemandasNaoIniciadasZodDto extends createZodDto(
  demandasNaoIniciadas,
) {}
