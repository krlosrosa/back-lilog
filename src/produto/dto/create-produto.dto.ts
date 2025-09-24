import { createZodDto } from 'nestjs-zod';
import { Empresa } from 'src/_shared/enums/empresa.enum';
import { TipoPeso } from 'src/_shared/enums/peso.enum';
import { SegmentoProduto } from 'src/_shared/enums/segmentoProduto.enum';
import { z } from 'zod';

export const CreateProdutoSchema = z.object({
  sku: z.string(),
  codEan: z.string().optional(),
  codDum: z.string().optional(),
  descricao: z.string(),
  shelf: z.number(),
  tipoPeso: z.nativeEnum(TipoPeso),
  pesoLiquidoCaixa: z.number(),
  pesoLiquidoUnidade: z.number(),
  unPorCaixa: z.number(),
  caixaPorPallet: z.number(),
  segmento: z.nativeEnum(SegmentoProduto),
  empresa: z.nativeEnum(Empresa),
});

export class CreateProdutoZodDto extends createZodDto(CreateProdutoSchema) {}
