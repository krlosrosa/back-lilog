import { createZodDto } from 'nestjs-zod';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { z } from 'zod';

export const ResultadoConferenciaDtoRequestSchema = z.object({
  id: z.number(),
  placa: z.string(),
  transportadora: z.string(),
  motorista: z.string(),
  status: z.nativeEnum(StatusDevolucao),
  data: z.string(),
  nfs: z.array(
    z.object({
      nf: z.string(),
      nfParcial: z.string().optional(),
      tipo: z.nativeEnum(TipoDevolucaoNotas),
    }),
  ),
  temperaturaBau: z.number(),
  temperaturaProduto: z.number(),
  itens: z.array(
    z.object({
      sku: z.string(),
      descricao: z.string(),
      lote: z.string(),
      quantidadeCaixasContabil: z.number(),
      quantidadeUnidadesContabil: z.number(),
      quantidadeCaixasFisico: z.number(),
      quantidadeUnidadesFisico: z.number(),
      avariaCaixas: z.number(),
      avariaUnidades: z.number(),
    }),
  ),
});

export class ResultadoConferenciaDtoRequest extends createZodDto(
  ResultadoConferenciaDtoRequestSchema,
) {}
