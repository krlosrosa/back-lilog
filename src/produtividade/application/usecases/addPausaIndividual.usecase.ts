import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PausaEntity } from 'src/produtividade/domain/entities/pausa.entity';
import { type IPausaRepository } from 'src/produtividade/domain/repositories/iPausaRepository';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';

export type AddPauseToDemandCommand = {
  paleteId: string;
  motivo: string;
  registradoPorId: string;
  descricao?: string;
};

@Injectable()
export class AddPausaIndividualUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
    @Inject('IPausaRepository')
    private readonly pausaRepository: IPausaRepository,
  ) {}

  async execute(command: AddPauseToDemandCommand) {
    const demanda = await this.produtividadeRepository.findByPalletId(
      command.paleteId,
    );

    if (!demanda) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demanda.status !== StatusDemanda.EM_PROGRESSO) {
      throw new BadRequestException('Demanda não está em andamento');
    }

    const pausa = PausaEntity.create({
      inicio: new Date(),
      motivo: command.motivo,
      descricao: command.descricao,
      registradoPorId: command.registradoPorId,
    });

    await this.pausaRepository.adicionarPausa(pausa, demanda.id);
    return Promise.resolve('Pausa individual adicionada');
  }
}
