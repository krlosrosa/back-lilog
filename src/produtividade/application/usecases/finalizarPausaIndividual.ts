import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { type IPausaRepository } from 'src/produtividade/domain/repositories/iPausaRepository';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';

@Injectable()
export class FinalizarPausaIndividualUsecase {
  constructor(
    @Inject('IPausaRepository')
    private readonly pausaRepository: IPausaRepository,
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
  ) {}

  async execute(palletId: string, observacao?: string) {
    const demanda = await this.produtividadeRepository.findByPalletId(palletId);

    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demanda.status !== StatusDemanda.PAUSA) {
      throw new BadRequestException('Demanda não está em pausa');
    }

    const pausa = demanda.finalizarPausa();

    if (!pausa) {
      throw new BadRequestException('Não foi possível finalizar a pausa');
    }

    await this.pausaRepository.finalizarPausa(pausa, demanda.id, observacao);
  }
}
