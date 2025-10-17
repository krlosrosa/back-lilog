import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const dashDaniloPausa = z.array(
  z.object({
    id: z.number(),
    inicio: z.string(),
    fim: z.string().nullable(),
    motivo: z.string().nullable(),
    descricao: z.string().nullable(),
    demandaId: z.number(),
    registradoPorId: z.string(),
    pausaGeralId: z.number().nullable(),
  }),
);

export class DashDaniloPausaZodDto extends createZodDto(dashDaniloPausa) {}
