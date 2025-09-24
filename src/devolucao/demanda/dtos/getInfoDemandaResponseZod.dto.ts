import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GetInfoDemandaResponseZodDtoSchema = z.object({
  id: z.number(),
  placa: z.string(),
  motorista: z.string(),
  transportadora: z.string(),
  cargaSegregada: z.boolean(),
  retornoPalete: z.boolean(),
  quantidadePaletes: z.number(),
  status: z.string(),
});

export class GetInfoDemandaResponseZodDto extends createZodDto(
  GetInfoDemandaResponseZodDtoSchema,
) {}
