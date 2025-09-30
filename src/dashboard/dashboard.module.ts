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

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardListener,
    AtualizarDashBoardCentroUsecase,
    AtualizarDashBoardUserUsecase,
    StatusPorTransporteUsecase,
    DashCentrosUsecase,
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
