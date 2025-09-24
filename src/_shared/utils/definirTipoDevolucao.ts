import { TipoDevolucaoNotas } from '../enums/tipoDevolucao.enum';

export function definirTipoDevolucao(tipo: number): TipoDevolucaoNotas {
  if (tipo === 1) {
    return TipoDevolucaoNotas.DEVOLUCAO;
  }
  if (tipo === 2) {
    return TipoDevolucaoNotas.DEVOLUCAO_PARCIAL;
  }
  if (tipo === 3) {
    return TipoDevolucaoNotas.REENTREGA;
  }
  return TipoDevolucaoNotas.DEVOLUCAO;
}
