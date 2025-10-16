import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { BuscarInfoDemandaResponseZodDto } from 'src/produtividade/dto/buscarInfoDemanda.dto';

@Injectable()
export class BuscarInfoDemandaUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
  ) {}

  async execute(param: string): Promise<BuscarInfoDemandaResponseZodDto> {
    let infoDemandaParam: string = param;
    const demandaId = await this.produtividadeRepository.findByPalletId(param);

    if (demandaId) {
      infoDemandaParam = String(demandaId.id);
    }

    const demanda = await this.produtividadeRepository.buscarInfoDemanda(
      Number(infoDemandaParam),
    );

    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    return {
      id: demanda.id,
      processo: demanda.processo,
      inicio: demanda.inicio.toISOString(),
      fim: demanda.fim?.toISOString() ?? null,
      status: demanda.status,
      cadastradoPorId: demanda.cadastradoPorId,
      turno: demanda.turno,
      funcionarioId: demanda.funcionarioId,
      funcionario: demanda.funcionario,
      criadoEm: demanda.criadoEm.toISOString(),
      centerId: demanda.centerId,
      obs: demanda.obs ?? null,
      tempoTrabalhado: demanda.calcularTempoTrabalhado(),
      tempoPausas: demanda.calcularTempoPausas(),
      tempoTotal: demanda.calcularTempoTotal(),
      produtividade: demanda.calcularProdutividade(),
      pausas:
        demanda.pausas?.map((pausa) => ({
          id: pausa.id,
          inicio: pausa.inicio.toISOString(),
          fim: pausa.fim?.toISOString() ?? null,
          motivo: pausa.motivo ?? null,
          descricao: pausa.descricao ?? null,
          registradoPorId: pausa.registradoPorId,
          pausaGeralId: null,
        })) ?? [],
      paletes:
        demanda.paletes?.map((palete) => ({
          id: palete.id,
          empresa: palete.empresa,
          quantidadeCaixas: palete.caixas,
          quantidadeUnidades: palete.unidades,
          quantidadePaletes: palete.paletes,
          enderecoVisitado: palete.visitas,
          segmento: palete.segmento,
          transporteId: palete.transporteId,
          tipoProcesso: palete.processo,
          criadoEm: palete.criadoEm.toISOString(),
          atualizadoEm: palete.atualizadoEm.toISOString(),
          status: palete.status,
          validado: palete.validado,
          criadoPorId: palete.criadoPorId,
        })) ?? [],
    };
  }
}
