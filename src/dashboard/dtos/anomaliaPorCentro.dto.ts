import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AnomaliaPorCentroSchema = z.array(
  z.object({
    id: z.number().optional(), // id gerado automaticamente
    demandaId: z.number(),
    centerId: z.string(),
    funcionarioId: z.string(),
    nomeFuncionario: z.string(),
    cadastroPorId: z.string(),
    nomeCadastradoPor: z.string(),
    inicio: z.string(),
    fim: z.string().nullable().optional(), // pode ser null ou opcional
    caixas: z.number(),
    unidades: z.number(),
    paletes: z.number(),
    enderecosVisitado: z.number(),
    produtividade: z.number(),
    motivoAnomalia: z.string(),
  }),
);

export class AnomaliaPorCentroZodDto extends createZodDto(
  AnomaliaPorCentroSchema,
) {}
