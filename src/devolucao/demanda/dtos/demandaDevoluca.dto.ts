import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';

export const DemandaDevolucaoDtoResponseSchema = z.array(
  z.object({
    id: z.number(),
    placa: z.string(),
    motorista: z.string(),
    idTransportadora: z.string(),
    transportadora: z.string(),
    telefone: z.string(),
    cargaSegregada: z.boolean(),
    retornoPalete: z.boolean(),
    quantidadePaletes: z.number(),
    centerId: z.string(),
    adicionadoPorId: z.string(),
    conferenteId: z.string(),
    criadoEm: z.date(),
    atualizadoEm: z.date(),
    status: z.nativeEnum(StatusDevolucao),
    fechouComAnomalia: z.boolean(),
    liberadoParaConferenciaEm: z.date(),
    inicioConferenciaEm: z.date(),
    fimConferenciaEm: z.date(),
    finalizadoEm: z.date(),
    senha: z.string(),
  }),
);

export class DemandaDevolucaoDtoResponse extends createZodDto(
  DemandaDevolucaoDtoResponseSchema,
) {}
