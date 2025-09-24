import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ItensDoTransporteSchema = z.array(
  z.object({
    codItem: z.string(),
    lote: z.string(),
    descricao: z.string(),
  }),
);

export class ItensDoTransporteZodDto extends createZodDto(
  ItensDoTransporteSchema,
) {}
