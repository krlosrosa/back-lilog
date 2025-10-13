import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const produtividadeSchema = z.object({
  dataRegistro: z.string(),
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  produtividade: z.number(),
});

const rankingProdutividadePorTurnoSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  produtividade: z.number(),
  turno: z.string(),
});

const rankingProdutividadePorempresaSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  produtividade: z.number(),
  empresa: z.string(),
});
const rankingProdutividadePorFuncionarioSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  produtividade: z.number(),
  id: z.string(),
  nome: z.string(),
});

export const DashCentrosSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  totalDemandas: z.number(),
  produtividade: z.number(),
  topCincoProdutividade: z.array(rankingProdutividadePorFuncionarioSchema),
  topCincoPiores: z.array(rankingProdutividadePorFuncionarioSchema),
  produtividadeDiaDia: z.array(produtividadeSchema),
  rankingProdutividadePorTurno: z.array(rankingProdutividadePorTurnoSchema),
  rankingProdutividadePorEmpresa: z.array(rankingProdutividadePorempresaSchema),
});

export class DashUmCentrosZodDto extends createZodDto(DashCentrosSchema) {}
