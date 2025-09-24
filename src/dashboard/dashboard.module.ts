import { Module } from '@nestjs/common';
import { DashboardListener } from './dashboard.service';
import { DashCenterPrismaRepository } from './infra/prisma/dashCente.infra';
import { AtualizarDashBoardCentroUsecase } from './application/atualizarDashBoardCentro.use';
import { AtualizarDashBoardUserUsecase } from './application/atualizarDashBoardUser.use';
import { DashUserPrismaRepository } from './infra/prisma/dashUser.infra';
import { DashboardResolver } from './dashboard.resolver';
import { StatusPorTransporteUsecase } from './application/statusPorTransporte.usecase';

@Module({
  providers: [
    DashboardListener,
    AtualizarDashBoardCentroUsecase,
    AtualizarDashBoardUserUsecase,
    StatusPorTransporteUsecase,
    {
      provide: 'IDashboardRepository',
      useClass: DashCenterPrismaRepository,
    },
    {
      provide: 'IDashboardRepositoryUser',
      useClass: DashUserPrismaRepository,
    },
    DashboardResolver,
  ],
})
export class DashboardModule {}
