import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  StatusDemanda,
  StatusPalete,
  TipoProcesso,
  Turno,
} from '../enums/produtividade.enums';

export const buscarInfoDemandaResponseSchema = z.object({
  id: z.number(),
  processo: z.nativeEnum(TipoProcesso),
  inicio: z.string(),
  fim: z.string().nullable(),
  status: z.nativeEnum(StatusDemanda),
  cadastradoPorId: z.string(),
  turno: z.nativeEnum(Turno),
  funcionarioId: z.string(),
  funcionario: z.string(),
  criadoEm: z.string(),
  centerId: z.string(),
  obs: z.string().nullable(),
  tempoTrabalhado: z.number(),
  tempoPausas: z.number(),
  tempoTotal: z.number(),
  produtividade: z.number(),
  pausas: z.array(
    z
      .object({
        id: z.number(),
        inicio: z.string(),
        fim: z.string().nullable(),
        motivo: z.string().nullable(),
        descricao: z.string().nullable(),
        registradoPorId: z.string(),
        pausaGeralId: z.number().nullable(),
      })
      .nullable(),
  ),
  paletes: z.array(
    z
      .object({
        id: z.string(),
        empresa: z.string(),
        quantidadeCaixas: z.number(),
        quantidadeUnidades: z.number(),
        quantidadePaletes: z.number(),
        enderecoVisitado: z.number(),
        segmento: z.string(),
        transporteId: z.string(),
        tipoProcesso: z.nativeEnum(TipoProcesso),
        criadoEm: z.string(),
        atualizadoEm: z.string(),
        status: z.nativeEnum(StatusPalete),
        validado: z.boolean(),
        criadoPorId: z.string(),
      })
      .nullable(),
  ),
});

export class BuscarInfoDemandaResponseZodDto extends createZodDto(
  buscarInfoDemandaResponseSchema,
) {}
