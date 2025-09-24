import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ListarPermissionsSchema = z.object({
  id: z.string(),
  processo: z.string(),
  role: z.string(),
});

export class ListarPermissionsZodDto extends createZodDto(
  ListarPermissionsSchema,
) {}
