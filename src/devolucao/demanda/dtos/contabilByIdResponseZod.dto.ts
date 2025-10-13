import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ContabilByIdResponseZodDtoSchema = z.object({
  demandaId: z.number(),
  devolucaoItens: z.array(
    z.object({
      tipo: z.string(),
      id: z.number(),
      sku: z.string(),
      descricao: z.string(),
      quantidadeCaixas: z.number(),
      quantidadeUnidades: z.number(),
    }),
  ),
});

export class ContabilByIdResponseZodDto extends createZodDto(
  ContabilByIdResponseZodDtoSchema,
) {}

const devolucaiItems = z.array(
  z.object({
    tipo: z.string(),
    id: z.number(),
    sku: z.string(),
    descricao: z.string(),
    quantidadeCaixas: z.number(),
    quantidadeUnidades: z.number(),
  }),
);

export class DevolucaItemsZtoDto extends createZodDto(devolucaiItems) {}
