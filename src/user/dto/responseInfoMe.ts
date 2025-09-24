import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export enum Role {
  USER = 'USER',
  FUNCIONARIO = 'FUNCIONARIO',
  ADMIN = 'ADMIN',
}

export const ResponseInfoMeSchema = z.object({
  listCenterRole: z.array(
    z.object({
      centerId: z.string(),
      role: z.nativeEnum(Role),
      processo: z.string(),
    }),
  ),
});

export class ResponseInfoMeZodDto extends createZodDto(ResponseInfoMeSchema) {}
