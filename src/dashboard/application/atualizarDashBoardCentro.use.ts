import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from 'src/dashboard/domain/repository/IDashboardRepositoryCenter.repository';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { DashCenterEntity } from '../domain/entities/dashCenter.entity';

@Injectable()
export class AtualizarDashBoardCentroUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(demanda: DemandaEntity): Promise<void> {
    const dashboard =
      await this.dashboardRepository.buscarProdutibidadeAtualCentro({
        centerId: demanda.centerId,
        processo: demanda.processo,
        turno: demanda.turno,
        dataRegistro: demanda.dataRegistro,
      });
    if (!dashboard) {
      const dashCenter = DashCenterEntity.create({
        dataRegistro: demanda.dataRegistro,
        centerId: demanda.centerId,
        totalCaixas: demanda.quantidadeCaixas(),
        totalUnidades: demanda.quantidadeUnidades(),
        totalPaletes: demanda.quantidadePaletes(),
        totalEnderecos: demanda.quantidadeVisitas(),
        totalPausasQuantidade: demanda.quantidadePausas(),
        totalPausasTempo: demanda.calcularTempoPausas(),
        totalTempoTrabalhado: demanda.calcularTempoTrabalhado(),
        totalDemandas: demanda.quantidadeDemandas(),
        processo: demanda.processo,
        turno: demanda.turno,
      });
      return this.dashboardRepository.atualizarDashBoardCentro(dashCenter);
    }
    const newDashboard = DashCenterEntity.create({
      dataRegistro: dashboard.dataRegistro,
      centerId: dashboard.centerId,
      processo: dashboard.processo,
      turno: dashboard.turno,
      totalCaixas: dashboard.totalCaixas + demanda.quantidadeCaixas(),
      totalUnidades: dashboard.totalUnidades + demanda.quantidadeUnidades(),
      totalPaletes: dashboard.totalPaletes + demanda.quantidadePaletes(),
      totalEnderecos: dashboard.totalEnderecos + demanda.quantidadeVisitas(),
      totalPausasQuantidade:
        dashboard.totalPausasQuantidade + demanda.quantidadePausas(),
      totalPausasTempo:
        dashboard.totalPausasTempo + demanda.calcularTempoPausas(),
      totalTempoTrabalhado:
        dashboard.totalTempoTrabalhado + demanda.calcularTempoTrabalhado(),
      totalDemandas: dashboard.totalDemandas + demanda.quantidadeDemandas(),
    });
    return this.dashboardRepository.atualizarDashBoardCentro(newDashboard);
  }
}
