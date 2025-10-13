import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const SalvarImagensBancoSchema = z.object({
  demandaId: z.string(),
  processo: z.string(),
  tag: z.string(),
});

export class SalvarImagensBancoZodDto extends createZodDto(
  SalvarImagensBancoSchema,
) {}
