import { Module } from '@nestjs/common';
import { DashboardListener } from './dashboard.service';
import { DashCenterPrismaRepository } from './infra/prisma/dashCente.infra';
import { AtualizarDashBoardCentroUsecase } from './application/atualizarDashBoardCentro.use';
import { AtualizarDashBoardUserUsecase } from './application/atualizarDashBoardUser.use';
import { DashUserPrismaRepository } from './infra/prisma/dashUser.infra';
import { DashboardResolver } from './dashboard.resolver';
import { StatusPorTransporteUsecase } from './application/statusPorTransporte.usecase';
import { DashCentrosUsecase } from './application/dashCentros.usecase';
import { DashboardController } from './dashboard.controller';
import { DashUmCentroUsecase } from './application/dashUmCentro.usecase';
import { BuscarAnomaliaPorCentroUsecase } from './application/buscarAnomaliasPorCentro.usecase';
import { OverViewAcompanhamentoUsecase } from './application/overViewAcompanhamento.usecase';
import { ProdutividadePrismaRepository } from 'src/produtividade/infra/prisma/produtividade-prisma.repository';
import { DashDaniloUsecase } from './application/dashDaniloProdutividade.useCase';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardListener,
    AtualizarDashBoardCentroUsecase,
    AtualizarDashBoardUserUsecase,
    StatusPorTransporteUsecase,
    DashCentrosUsecase,
    DashUmCentroUsecase,
    BuscarAnomaliaPorCentroUsecase,
    OverViewAcompanhamentoUsecase,
    DashDaniloUsecase,
    {
      provide: 'IDashboardRepository',
      useClass: DashCenterPrismaRepository,
    },
    {
      provide: 'IDashboardRepositoryUser',
      useClass: DashUserPrismaRepository,
    },
    {
      provide: 'IProdutividadeRepository',
      useClass: ProdutividadePrismaRepository,
    },
    DashboardResolver,
  ],
})
export class DashboardModule {}
