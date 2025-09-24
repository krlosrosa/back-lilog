import { Inject, Injectable } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';
import { DevolucaoItensEntity } from '../domain/entities/devolucaoItens.entity';
import {
  ResumoDevolucaoDto,
  ResumoDevolucaoItemDto,
} from '../dtos/resumoItemRetorno';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';

@Injectable()
export class ResultadoDemandaUseCase {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number): Promise<ResumoDevolucaoDto> {
    const demanda = await this.demandaRepository.getDemandaById(demandaId);
    const resumoItens = resumirItens(demanda?.devolucaoItens ?? []);
    return {
      temperaturaBau: demanda?.devolucaoCheckList?.temperaturaBau ?? 0,
      temperaturaProduto: demanda?.devolucaoCheckList?.temperaturaProduto ?? 0,
      placa: demanda?.placa ?? '',
      motorista: demanda?.motorista ?? '',
      transportadora: demanda?.idTransportadora ?? '',
      operador: demanda?.adicionadoPorId ?? '',
      conferente: demanda?.conferenteId ?? '',
      itens: resumoItens,
      notas:
        demanda?.devolucaoNotas?.map((nota) => ({
          tipo: nota.tipo as TipoDevolucaoNotas,
          nf: nota.notaFiscal,
          nfParcial: nota?.nfParcial ?? '',
        })) ?? [],
      status: demanda?.status as StatusDevolucao,
    };
  }
}

export function resumirItens(
  itens: DevolucaoItensEntity[],
): ResumoDevolucaoItemDto[] {
  const resumoMap = new Map<string, ResumoDevolucaoItemDto>();

  for (const item of itens) {
    const sku = item.sku;
    const existente = resumoMap.get(sku);

    const quantidadeCaixa = item.quantidadeCaixas ?? 0;
    const quantidadeUnidade = item.quantidadeUnidades ?? 0;

    const avariasCaixa = item.avariaCaixas ?? 0;
    const avariasUnidade = item.avariaUnidades ?? 0;

    if (!existente) {
      resumoMap.set(sku, {
        sku,
        descricao: item.descricao,
        totalContabilCaixa: item.tipo === 'CONTABIL' ? quantidadeCaixa : 0,
        totalFisicoCaixa: item.tipo === 'FISICO' ? quantidadeCaixa : 0,
        totalContabilUnidade: item.tipo === 'CONTABIL' ? quantidadeUnidade : 0,
        totalFisicoUnidade: item.tipo === 'FISICO' ? quantidadeUnidade : 0,
        diferencaCaixa: 0, // calculo depois
        diferencaUnidade: 0, // calculo depois
        totalAvariasCaixa: avariasCaixa,
        totalAvariasUnidade: avariasUnidade,
      });
    } else {
      if (item.tipo === 'CONTABIL') {
        existente.totalContabilCaixa += quantidadeCaixa;
        existente.totalContabilUnidade += quantidadeUnidade;
      } else if (item.tipo === 'FISICO') {
        existente.totalFisicoCaixa += quantidadeCaixa;
        existente.totalFisicoUnidade += quantidadeUnidade;
      }
      existente.totalAvariasCaixa += avariasCaixa;
      existente.totalAvariasUnidade += avariasUnidade;
    }
  }

  // Atualiza diferença
  for (const resumo of resumoMap.values()) {
    resumo.diferencaCaixa = resumo.totalContabilCaixa - resumo.totalFisicoCaixa;
    resumo.diferencaUnidade =
      resumo.totalContabilUnidade - resumo.totalFisicoUnidade;
  }

  return Array.from(resumoMap.values());
}
