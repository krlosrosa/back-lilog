import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';
import { DashDaniloProdutividadeZodDto } from '../dtos/dashDaniloProdutividade.dto';

@Injectable()
export class DashDaniloUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    dataInicio: string,
    dataFim: string,
    centro: string,
  ): Promise<DashDaniloProdutividadeZodDto> {
    const demandas = await this.dashboardRepository.dashDaniloProdutividade(
      dataInicio,
      dataFim,
      centro,
    );

    return demandas.map((item) => {
      return {
        id: item.id,
        empresa: item.empresa,
        processo: item.processo,
        caixas: item.quantidadeCaixas(),
        unidade: item.quantidadeUnidades(),
        visitado: item.quantidadeVisitas(),
        horaInicio: item.inicio.toISOString(),
        horaFim: item.fim?.toISOString() || null,
        centerId: item.centerId,
        dataRegistro: item.dataRegistro,
        userId: item.cadastradoPorId,
        funcionarioId: item.funcionarioId,
        segmento: item.segmento,
        nomeFuncionario: item.funcionario,
        produtividade: item.calcularProdutividade(),
        intervaloTrabalhado: item.calcularTempoTrabalhado(),
        intervaloPausa: item.calcularTempoPausas(),
        tempoTotal: item.calcularTempoTotal(),
      };
    });
  }
}
