import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { CriarAnomaliaProdutividadeUsecase } from './application/criarAnomaliaProdutividade';

@Injectable()
export class AnomaliasProdutividadeService {
  constructor(
    @Inject(CriarAnomaliaProdutividadeUsecase)
    private readonly atualizarDashBoardCentroUsecase: CriarAnomaliaProdutividadeUsecase,
  ) {}
  @OnEvent('produtividade.finalizada')
  async createAnomalia(payload: DemandaEntity) {
    await this.atualizarDashBoardCentroUsecase.execute(payload);
  }
}
