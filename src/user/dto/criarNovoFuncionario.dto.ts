import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CriarNovoFuncionarioSchema = z.object({
  centerId: z.string(),
  id: z.string(),
  nome: z.string(),
  turno: z.string(),
  role: z.string(),
});

export class CriarNovoFuncionarioZodDto extends createZodDto(
  CriarNovoFuncionarioSchema,
) {}
