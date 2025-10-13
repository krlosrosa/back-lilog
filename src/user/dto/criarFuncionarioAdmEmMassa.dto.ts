import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CriarFuncionarioAdmSchemaEmMassa = z.array(
  z.object({
    id: z.string(),
    nome: z.string(),
    primeiroNome: z.string(),
    ultimoNome: z.string(),
    turno: z.string(),
  }),
);

export class CriarFuncionarioAdmEmMassaZodDto extends createZodDto(
  CriarFuncionarioAdmSchemaEmMassa,
) {}
