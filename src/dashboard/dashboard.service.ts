import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { AtualizarDashBoardCentroUsecase } from './application/atualizarDashBoardCentro.use';
import { AtualizarDashBoardUserUsecase } from './application/atualizarDashBoardUser.use';

@Injectable()
export class DashboardListener {
  constructor(
    @Inject(AtualizarDashBoardCentroUsecase)
    private readonly atualizarDashBoardCentroUsecase: AtualizarDashBoardCentroUsecase,
    @Inject(AtualizarDashBoardUserUsecase)
    private readonly atualizarDashBoardUserUsecase: AtualizarDashBoardUserUsecase,
  ) {}

  @OnEvent('produtividade.finalizada')
  async updateDashBoardUser(payload: DemandaEntity) {
    await this.atualizarDashBoardUserUsecase.execute(payload);
  }

  @OnEvent('produtividade.finalizada')
  async updateDashBoardCentro(payload: DemandaEntity) {
    await this.atualizarDashBoardCentroUsecase.execute(payload);
  }
}
