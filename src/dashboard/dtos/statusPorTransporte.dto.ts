import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StatusPorTransporteDtoSchema = z.object({
  naoIniciado: z.number(),
  emSeparacao: z.number(),
  emConferencia: z.number(),
  emCarregamento: z.number(),
  carregamentoConcluido: z.number(),
  faturado: z.number(),
});

export class StatusPorTransporteZodDto extends createZodDto(
  StatusPorTransporteDtoSchema,
) {}
