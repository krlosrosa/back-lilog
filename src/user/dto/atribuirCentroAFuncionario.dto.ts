import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Role } from '@prisma/client';

export const AtribuirCentroAFuncionarioSchema = z.object({
  centerId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(Role),
});

export class AtribuirCentroAFuncionarioZodDto extends createZodDto(
  AtribuirCentroAFuncionarioSchema,
) {}
