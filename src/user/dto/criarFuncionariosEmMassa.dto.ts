import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  turno: z.string(),
});
export const CriarFuncionariosEmMassaSchema = z.object({
  centerId: z.string(),
  users: z.array(UserSchema),
});

export class CriarFuncionariosEmMassaZodDto extends createZodDto(
  CriarFuncionariosEmMassaSchema,
) {}
