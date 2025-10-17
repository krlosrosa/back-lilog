import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const dashDaniloProdutividade = z.array(
  z.object({
    id: z.number(),
    empresa: z.string(),
    processo: z.string(),
    caixas: z.number(),
    unidade: z.number(),
    visitado: z.number(),
    horaInicio: z.string(),
    horaFim: z.string().nullable(),
    centerId: z.string(),
    dataRegistro: z.string(),
    userId: z.string(),
    funcionarioId: z.string(),
    segmento: z.string(),
    nomeFuncionario: z.string(),
    produtividade: z.number(),
    intervaloTrabalhado: z.number(),
    intervaloPausa: z.number(),
    tempoTotal: z.number(),
  }),
);

export class DashDaniloProdutividadeZodDto extends createZodDto(
  dashDaniloProdutividade,
) {}
