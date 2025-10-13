import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const criarAnomaliaschema = z.object({
  id: z.number().int().optional(), // @id @default(autoincrement())
  demandaId: z.number().int(),
  centerId: z.string(),
  funcionarioId: z.string(),
  nomeFuncionario: z.string(),
  cadastroPorId: z.string(),
  nomeCadastradoPor: z.string(),
  inicio: z.date(),
  fim: z.date().optional(),
  caixas: z.number().int(),
  unidades: z.number().int(),
  paletes: z.number().int(),
  enderecosVisitado: z.number().int(),
  produtividade: z.number().transform((val) => parseFloat(val.toFixed(2))), // garante float
  motivoAnomalia: z.string(),
});

export class CriarAnomaliaZodDto extends createZodDto(criarAnomaliaschema) {}
