import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FinalizarProdutividadeUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(palletId: string, observacao?: string): Promise<void> {
    const demanda = await this.produtividadeRepository.findByPalletId(palletId);

    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demanda.status !== StatusDemanda.EM_PROGRESSO) {
      throw new BadRequestException(
        'Demanda não pode ser finalizada, pois não está em andamento',
      );
    }

    demanda.finalizarDemanda(observacao);

    await this.produtividadeRepository.finalizarDemanda(demanda);
    this.eventEmitter.emit('produtividade.finalizada', demanda);
  }
}
