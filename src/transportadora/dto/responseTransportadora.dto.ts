import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ResponseTransportadoraDtoSchema = z.array(
  z.object({
    id: z.number(),
    nome: z.string(),
    centerId: z.string(),
  }),
);

export class ResponseTransportadoraDto extends createZodDto(
  ResponseTransportadoraDtoSchema,
) {}
