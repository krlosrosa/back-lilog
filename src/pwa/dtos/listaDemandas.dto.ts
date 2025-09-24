import { createZodDto } from 'nestjs-zod';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { z } from 'zod';

export const ListaDemandasSchema = z.array(
  z.object({
    id: z.number(),
    placa: z.string(),
    motorista: z.string(),
    data: z.string(),
    conferenteId: z.string(),
    doca: z.string(),
    status: z.nativeEnum(StatusDevolucao),
    transportadora: z.string(),
    cargaSegregada: z.boolean(),
    retornoPalete: z.boolean(),
    quantidadePaletes: z.number(),
  }),
);

export class ListaDemandasZodDto extends createZodDto(ListaDemandasSchema) {}
