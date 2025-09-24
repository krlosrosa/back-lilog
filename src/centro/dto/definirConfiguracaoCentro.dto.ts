import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const DefinirConfiguracaoCentroDtoSchema = z.object({
  tipoImpressao: z.enum(['TRANSPORTE', 'CLIENTE']),
  tipoQuebra: z.enum(['LINHAS', 'PERCENTUAL']).nullable(),
  quebraPalete: z.boolean(),
  valorQuebra: z.number().nullable(),
  separarPaleteFull: z.boolean(),
  separarUnidades: z.boolean(),
  exibirInfoCabecalho: z.enum(['PRIMEIRO', 'TODOS', 'NENHUM']),
  segregarFifo: z.array(z.string()),
  dataMaximaPercentual: z.number().nullable(),
});

export class DefinirConfiguracaoImpressaoDto extends createZodDto(
  DefinirConfiguracaoCentroDtoSchema,
) {}
