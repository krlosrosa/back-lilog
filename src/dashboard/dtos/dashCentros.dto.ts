import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const produtividadeSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  produtividade: z.number(),
});

const rankingProdutividadePorCentroSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  cluster: z.string(),
  produtividade: z.number(),
  centro: z.string(),
});

const rankingProdutividadePorClusterSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  cluster: z.string(),
  produtividade: z.number(),
});

export const DashCentrosSchema = z.object({
  totalCaixas: z.number(),
  horasTrabalhadas: z.number(),
  totalDemandas: z.number(),
  produtividade: z.number(),
  topCincoProdutividade: z.array(rankingProdutividadePorCentroSchema),
  produtividadeDiaDia: z.array(produtividadeSchema),
  rankingProdutividadePorCentro: z.array(rankingProdutividadePorCentroSchema),
  rankingProdutividadePorCluster: z.array(rankingProdutividadePorClusterSchema),
});

export class DashCentrosZodDto extends createZodDto(DashCentrosSchema) {}
