import { z } from 'zod';
import { TipoProcesso } from '../enums/produtividade.enums';
import { createZodDto } from 'nestjs-zod';

export const overViewProdutividadeSchema = z.object({
  centerId: z.string(),
  data: z.string(),
  processo: z.nativeEnum(TipoProcesso),
});

export const overViewProdutividadeResponseSchema = z.object({
  processos: z.number(),
  emAndamento: z.number(),
  concluidos: z.number(),
  totalCaixas: z.number(),
  totalUnidades: z.number(),
  produtividade: z.number(),
});

export class OverViewProdutividadeResponseZodDto extends createZodDto(
  overViewProdutividadeResponseSchema,
) {}

export class OverViewProdutividadeZodDto extends createZodDto(
  overViewProdutividadeSchema,
) {}
