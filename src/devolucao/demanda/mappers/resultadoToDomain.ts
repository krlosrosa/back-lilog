import { DevolucaoItens } from '@prisma/client';
import { z } from 'zod';

// Schema de validação final
export const ResultadoConferenciaItemSchema = z.object({
  sku: z.string(),
  descricao: z.string(),
  lote: z.string(),
  quantidadeCaixasContabil: z.number(),
  quantidadeUnidadesContabil: z.number(),
  quantidadeCaixasFisico: z.number(),
  quantidadeUnidadesFisico: z.number(),
  avariaCaixas: z.number(),
  avariaUnidades: z.number(),
});

type ResultadoConferenciaItem = z.infer<typeof ResultadoConferenciaItemSchema>;

// Tipo Prisma simplificado

/**
 * Agrupa itens e retorna no formato esperado pelo DTO
 */
export function agruparDevolucaoItens(
  itens: DevolucaoItens[],
): ResultadoConferenciaItem[] {
  const resultado = new Map<string, ResultadoConferenciaItem>();

  for (const item of itens) {
    const key = `${item.demandaId}-${item.sku}`;

    if (!resultado.has(key)) {
      resultado.set(key, {
        sku: item.sku,
        descricao: item.descricao,
        lote: item.lote ?? '',
        quantidadeCaixasContabil:
          item.tipo === 'CONTABIL' ? (item.quantidadeCaixas ?? 0) : 0,
        quantidadeUnidadesContabil:
          item.tipo === 'CONTABIL' ? (item.quantidadeUnidades ?? 0) : 0,
        quantidadeCaixasFisico:
          item.tipo === 'FISICO' ? (item.quantidadeCaixas ?? 0) : 0, // se for outro cálculo, ajuste aqui
        quantidadeUnidadesFisico:
          item.tipo === 'FISICO' ? (item.quantidadeUnidades ?? 0) : 0,
        avariaCaixas: item.avariaCaixas ?? 0,
        avariaUnidades: item.avariaUnidades ?? 0,
      });
    } else {
      const acumulado = resultado.get(key)!;
      resultado.set(key, {
        ...acumulado,
        quantidadeCaixasContabil:
          acumulado.quantidadeCaixasContabil +
          (item.tipo === 'CONTABIL' ? (item.quantidadeCaixas ?? 0) : 0),
        quantidadeUnidadesContabil:
          acumulado.quantidadeUnidadesContabil +
          (item.tipo === 'CONTABIL' ? (item.quantidadeUnidades ?? 0) : 0),
        quantidadeCaixasFisico:
          acumulado.quantidadeCaixasFisico +
          (item.tipo === 'FISICO' ? (item.quantidadeCaixas ?? 0) : 0),
        quantidadeUnidadesFisico:
          acumulado.quantidadeUnidadesFisico +
          (item.tipo === 'FISICO' ? (item.quantidadeUnidades ?? 0) : 0),
        avariaCaixas: acumulado.avariaCaixas + (item.avariaCaixas ?? 0),
        avariaUnidades: acumulado.avariaUnidades + (item.avariaUnidades ?? 0),
      });
    }
  }

  // validação com zod
  return Array.from(resultado.values());
}
