import { StatusPaleteNest } from 'src/_shared/enums/statusPalete.enum';
import { StatusTransporte } from '../enums/transport.enum';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

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
  separacao: z.nativeEnum(StatusPaleteNest),
  conferencia: z.nativeEnum(StatusPaleteNest),
  carregamento: z.nativeEnum(StatusPaleteNest),
});

export type TransporteResponseDto = z.infer<typeof TransporteResponseDtoSchema>;

export class TransporteResponseZodDto extends createZodDto(
  TransporteResponseDtoSchema,
) {}
