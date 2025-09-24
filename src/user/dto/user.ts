import { createZodDto } from 'nestjs-zod';
import { Turno } from 'src/produtividade/enums/produtividade.enums';
import { z } from 'zod';

export enum Role {
  USER = 'USER',
  FUNCIONARIO = 'FUNCIONARIO',
  ADMIN = 'ADMIN',
}

export const ListarFuncionariosPorCentroSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    centerId: z.string(),
    turno: z.nativeEnum(Turno),
    role: z.nativeEnum(Role),
  }),
);

export class ListarFuncionariosPorCentroZodDto extends createZodDto(
  ListarFuncionariosPorCentroSchema,
) {}
