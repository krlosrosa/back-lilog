import { Inject, Injectable } from '@nestjs/common';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { DashUserEntity } from '../domain/entities/dashUser.entity';
import { type IDashboardRepositoryUser } from '../domain/repository/IDashboardRepositoryUser.repository';

@Injectable()
export class AtualizarDashBoardUserUsecase {
  constructor(
    @Inject('IDashboardRepositoryUser')
    private readonly dashboardRepository: IDashboardRepositoryUser,
  ) {}

  async execute(demanda: DemandaEntity): Promise<void> {
    const dashboard =
      await this.dashboardRepository.buscarProdutibidadeAtualUser({
        funcionarioId: demanda.funcionarioId,
        centerId: demanda.centerId,
        processo: demanda.processo,
        turno: demanda.turno,
        dataRegistro: demanda.dataRegistro,
      });
    if (!dashboard) {
      const dashUser = DashUserEntity.create({
        dataRegistro: demanda.dataRegistro,
        centerId: demanda.centerId,
        funcionarioId: demanda.funcionarioId,
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
      return this.dashboardRepository.atualizarDashBoardUser(dashUser);
    }
    const newDashboard = DashUserEntity.create({
      dataRegistro: dashboard.dataRegistro,
      centerId: dashboard.centerId,
      funcionarioId: dashboard.funcionarioId,
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
    return this.dashboardRepository.atualizarDashBoardUser(newDashboard);
  }
}
