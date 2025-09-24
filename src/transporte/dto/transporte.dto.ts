import { StatusTransporte } from '../enums/transport.enum';
import { z } from 'zod';

export const TransporteResponseDtoSchema = z.object({
  numeroTransporte: z.string(),
  status: z.nativeEnum(StatusTransporte),
  nomeRota: z.string(),
  nomeTransportadora: z.string(),
  placa: z.string(),
  temCortes: z.boolean().optional(),
  cadastradoPorId: z.string().optional(),
  prioridade: z.number().optional(),
  obs: z.string().optional(),
  qtdImpressaoSeparacao: z.number().optional(),
  qtdImpressaoCarregamento: z.number().optional(),
});

export type TransporteResponseDto = z.infer<typeof TransporteResponseDtoSchema>;
