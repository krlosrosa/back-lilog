import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { AtualizarSeparacaoUsecase } from './application/events/atualizarSeparacao.usecase';

@Injectable()
export class TransporteEventService {
  constructor(
    @Inject(AtualizarSeparacaoUsecase)
    private readonly atualizarSeparacao: AtualizarSeparacaoUsecase,
  ) {}

  @OnEvent('produtividade.finalizada')
  @OnEvent('produtividade.iniciada')
  async createAnomalia(payload: DemandaEntity) {
    await this.atualizarSeparacao.execute(payload.id);
  }
}
