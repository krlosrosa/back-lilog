import { createZodDto } from 'nestjs-zod';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { z } from 'zod';

export const AddItensEmDemandaSchema = z.array(
  z.object({
    idViagemRavex: z.string(),
    tipo: z.nativeEnum(TipoDevolucaoNotas),
    notaFiscal: z.string(),
    notaFiscalParcial: z.string().nullable().optional(),
    motivoDevolucao: z.string(),
    descMotivoDevolucao: z.string().nullable(),
    operador: z.string().nullable().optional(),
    itens: z.array(
      z.object({
        sku: z.string(),
        descricao: z.string().regex(/^(?!produto não encontrado$).*$/, {
          message: 'Valor inválido',
        }),
        pesoLiquido: z.number(),
        quantidadeRavex: z.number(),
        quantidadeCaixas: z.number(),
        quantidadeUnidades: z.number(),
        fatorConversao: z.number(),
        unPorCaixa: z.number(),
        decimal: z.number(),
      }),
    ),
  }),
);

export class AddItensEmDemandaDto extends createZodDto(
  AddItensEmDemandaSchema,
) {}
