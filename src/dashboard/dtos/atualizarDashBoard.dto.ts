import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AtualizarDashBoardCentroSchema = z.object({
  centerId: z.string(),
  processo: z.string(),
  turno: z.string(),
  dataRegistro: z.string(),
  cluster: z.string(),
});

export class AtualizarDashBoardCentroZodDto extends createZodDto(
  AtualizarDashBoardCentroSchema,
) {}
