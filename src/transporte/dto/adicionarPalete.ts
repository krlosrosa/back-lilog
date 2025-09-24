import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const PaleteInputZod = z.array(
  z.object({
    transporteId: z.string(),
    id: z.string(),
    empresa: z.string(),
    quantidadeCaixas: z.number(),
    quantidadeUnidades: z.number(),
    quantidadePaletes: z.number(),
    enderecoVisitado: z.number(),
    segmento: z.string(),
    tipoProcesso: z.string(),
  }),
);

export class PaleteInputZodDto extends createZodDto(PaleteInputZod) {}
