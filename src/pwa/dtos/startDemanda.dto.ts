import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StartDemandaSchema = z.object({
  demandaId: z.string(),
  horaInicio: z.string(),
  doca: z.string(),
});

export class StartDemandaZodDto extends createZodDto(StartDemandaSchema) {}
