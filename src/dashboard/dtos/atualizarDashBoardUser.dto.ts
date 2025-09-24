import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AtualizarDashBoardUserSchema = z.object({
  funcionarioId: z.string(),
  centerId: z.string(),
  processo: z.string(),
  turno: z.string(),
  dataRegistro: z.string(),
});

export class AtualizarDashBoardUserZodDto extends createZodDto(
  AtualizarDashBoardUserSchema,
) {}
