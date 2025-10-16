import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AtualizarSeparacaoUsecase } from './application/events/atualizarSeparacao.usecase';
import { type UpdateTransporteDto } from './dto/updateTransporte.dto';

@Injectable()
export class TransporteEventService {
  constructor(
    @Inject(AtualizarSeparacaoUsecase)
    private readonly atualizarSeparacao: AtualizarSeparacaoUsecase,
  ) {}

  @OnEvent('produtividade.updateTransporte')
  async createAnomalia(payload: UpdateTransporteDto) {
    return this.atualizarSeparacao.execute(payload);
  }
}
