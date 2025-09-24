import { createZodDto } from 'nestjs-zod';
import { Empresa } from 'src/_shared/enums/empresa.enum';
import { TipoPeso } from 'src/_shared/enums/peso.enum';
import { SegmentoProduto } from 'src/_shared/enums/segmentoProduto.enum';
import { z } from 'zod';

export const ResponseProdutoDtoSchema = z.object({
  codEan: z.string().optional(),
  codDum: z.string().optional(),
  sku: z.string(),
  descricao: z.string(),
  shelf: z.number(),
  tipoPeso: z.nativeEnum(TipoPeso),
  pesoLiquidoCaixa: z.number(),
  pesoLiquidoUnidade: z.number(),
  unPorCaixa: z.number(),
  caixaPorPallet: z.number(),
  segmento: z.nativeEnum(SegmentoProduto),
  empresa: z.nativeEnum(Empresa),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class ResponseProdutoDto extends createZodDto(
  ResponseProdutoDtoSchema,
) {}
