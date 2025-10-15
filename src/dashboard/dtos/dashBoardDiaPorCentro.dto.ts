import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const dashFuncionario = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.string(),
  caixas: z.number(),
  paletes: z.number(),
  unidades: z.number(),
  visitar: z.number(),
  produtividade: z.number(),
});

export type DashFuncionario = z.infer<typeof dashFuncionario>;

export const dashGerais = z.object({
  totalDemandas: z.number(),
  totalEmAndamento: z.number(),
  totalEmpausa: z.number(),
  totalFinalizado: z.number(),
  totalCaixas: z.number(),
  totalUnidades: z.number(),
  mediaEnderecosVisitados: z.number(),
});

export const pausaLonga = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.string(),
  motivoPausa: z.string(),
  tempoDePausa: z.number(),
});

export type DashPausa = z.infer<typeof pausaLonga>;

export const demandaLonga = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.string(),
  tempoDemanda: z.number(),
  visitas: z.number(),
  produtividade: z.number(),
  caixas: z.number(),
  unidade: z.number(),
  paletes: z.number(),
});

export type DashDemandaLonga = z.infer<typeof demandaLonga>;

export const produtividadeHoraHora = z.object({
  data: z.string(),
  caixas: z.number(),
  unidades: z.number(),
  paletes: z.number(),
  visitas: z.number(),
  produtividade: z.number(),
});

export const dashBoardDiaPorCentrorSchema = z.object({
  overView: dashGerais,
  topCinco: z.array(dashFuncionario),
  pioresCinco: z.array(dashFuncionario),
  anomaliaPausa: z.array(pausaLonga),
  anomaliaDemanda: z.array(demandaLonga),
  horaAHora: z.array(produtividadeHoraHora),
});

export class DashBoardDiaPorCentrodtoZodDto extends createZodDto(
  dashBoardDiaPorCentrorSchema,
) {}
