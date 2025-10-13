import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CheckListZodDtoSchema = z.object({
  temperaturaProduto: z.number().optional(),
  temperaturaCaminhao: z.number().optional(),
  anomalias: z.array(z.string()),
});

export const AnomaliaZodDtoSchema = z
  .array(
    z.object({
      id: z.number().optional(),
      pathArquivo: z.string(),
      sku: z.string(),
      natureza: z.string(),
      tipo: z.string(),
      causa: z.string(),
      caixas: z.number(),
      unidades: z.number(),
      observacoes: z.string(),
    }),
  )
  .optional();

const ConferenciaFisicaZodDtoSchema = z.array(
  z.object({
    id: z.number().optional(),
    tipo: z.string(),
    sku: z.string(),
    descricao: z.string(),
    lote: z.string(),
    sif: z.string(),
    fabricacao: z.string(),
    quantidadeCaixas: z.number(),
    quantidadeUnidades: z.number(),
  }),
);

export const FinalizarDemandaDevolucaoZodDtoSchema = z.object({
  checkList: CheckListZodDtoSchema,
  anomalia: AnomaliaZodDtoSchema,
  conferenciaFisica: ConferenciaFisicaZodDtoSchema,
});

export class FinalizarDemandaDevolucaoZodDto extends createZodDto(
  FinalizarDemandaDevolucaoZodDtoSchema,
) {}
