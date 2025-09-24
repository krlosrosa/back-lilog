import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';

@Injectable()
export class DeletarDemandaUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
  ) {}
  async execute(palletId: string) {
    const demanda = await this.produtividadeRepository.findByPalletId(palletId);

    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demanda.status !== StatusDemanda.EM_PROGRESSO) {
      throw new BadRequestException(
        'Demanda não pode ser deletada, pois não está em andamento',
      );
    }

    await this.produtividadeRepository.deletarDemanda(demanda.id);
  }
}
