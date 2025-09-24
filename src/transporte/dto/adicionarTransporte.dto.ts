import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const TransportInfoZod = z.array(
  z.object({
    numeroTransporte: z.string(),
    nomeRota: z.string().optional(),
    nomeTransportadora: z.string().optional(),
    placa: z.string().optional(),
    prioridade: z.number().optional(),
    obs: z.string().optional(),
  }),
);

export class TransportInfoZodDto extends createZodDto(TransportInfoZod) {}
