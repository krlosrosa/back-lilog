import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ListarNotasDemandaResponseZodDtoSchema = z.object({
  placa: z.string(),
  motorista: z.string(),
  transportadora: z.string(),
  cargaSegregada: z.boolean(),
  retornoPalete: z.boolean(),
  quantidadePaletes: z.number().nullable(),
  centerId: z.string(),
  adicionadoPorId: z.string(),
  criadoEm: z.string(),
  status: z.string(),
  notas: z.array(
    z.object({
      id: z.number(),
      viagemId: z.string(),
      empresa: z.string(),
      devolucaoDemandaId: z.number(),
      notaFiscal: z.string(),
      motivoDevolucao: z.string(),
      descMotivoDevolucao: z.string().nullable(),
      nfParcial: z.string().nullable(),
      criadoEm: z.string(),
      tipo: z.string(),
    }),
  ),
});

export class ListarNotasDemandaResponseZodDto extends createZodDto(
  ListarNotasDemandaResponseZodDtoSchema,
) {}
