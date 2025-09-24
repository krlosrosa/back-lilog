import { Empresa } from 'src/_shared/enums/empresa.enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';

export const AddContabilRavexDtoRequestSchema = z.array(
  z.object({
    empresa: z.nativeEnum(Empresa),
    devolucaoDemandaId: z.number(),
    notaFiscal: z.string(),
    motivoDevolucao: z.string(),
    descMotivoDevolucao: z.string().optional(),
    nfParcial: z.string().optional(),
    tipo: z.nativeEnum(TipoDevolucaoNotas),
    devolucaoItens: z.array(
      z.object({
        sku: z.string(),
        lote: z.string().optional(),
        quantidadeCaixas: z.number(),
        descricao: z.string(),
        fabricacao: z.string().optional(),
        sif: z.string().optional(),
        quantidadeUnidades: z.number(),
      }),
    ),
  }),
);

export class AddContabilRavexDtoRequest extends createZodDto(
  AddContabilRavexDtoRequestSchema,
) {}
