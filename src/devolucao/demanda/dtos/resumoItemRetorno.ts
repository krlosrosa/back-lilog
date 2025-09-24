import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';

export const ResumoDevolucaoItemSchema = z.object({
  sku: z.string(),
  descricao: z.string(),
  totalContabilCaixa: z.number(),
  totalFisicoCaixa: z.number(),
  totalContabilUnidade: z.number(),
  totalFisicoUnidade: z.number(),
  diferencaCaixa: z.number(),
  diferencaUnidade: z.number(),
  totalAvariasCaixa: z.number(),
  totalAvariasUnidade: z.number(),
});

export const ResumoDevolucaoSchema = z.object({
  temperaturaBau: z.number(),
  temperaturaProduto: z.number(),
  placa: z.string(),
  motorista: z.string(),
  transportadora: z.string(),
  status: z.nativeEnum(StatusDevolucao),
  operador: z.string(),
  conferente: z.string(),
  notas: z.array(
    z.object({
      tipo: z.nativeEnum(TipoDevolucaoNotas),
      nf: z.string(),
      nfParcial: z.string().optional(),
    }),
  ),
  itens: z.array(ResumoDevolucaoItemSchema),
});

export class ResumoDevolucaoItemDto extends createZodDto(
  ResumoDevolucaoItemSchema,
) {}

export class ResumoDevolucaoDto extends createZodDto(ResumoDevolucaoSchema) {}
