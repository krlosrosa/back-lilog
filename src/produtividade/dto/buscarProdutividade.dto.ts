import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Processo } from '../enums/produtividade.enums';

export const BuscarProdutividadeSchema = z.object({
  centerId: z.string(),
  data: z.string(),
  processo: z.nativeEnum(Processo),
  segmento: z.string(),
  status: z.string().optional(),
  empresa: z.string().optional(),
  paginacao: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
    })
    .optional(),
});

export class BuscarProdutividadeZodDto extends createZodDto(
  BuscarProdutividadeSchema,
) {}
