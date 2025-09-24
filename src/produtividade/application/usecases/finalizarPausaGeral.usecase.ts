import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { type IPausaRepository } from 'src/produtividade/domain/repositories/iPausaRepository';
import { FinalizarPauseGeralDto } from 'src/produtividade/dto/finalizarPauseGeral.dto';

@Injectable()
export class FinalizarPausaGeralUsecase {
  constructor(
    @Inject('IPausaRepository')
    private readonly pausaRepository: IPausaRepository,
  ) {}

  async execute(command: FinalizarPauseGeralDto) {
    const pausaGeral =
      await this.pausaRepository.buscarPausaGeralAtiva(command);

    if (!pausaGeral) {
      throw new BadRequestException('Pausa geral não encontrada');
    }

    // se não tiver, lançar um erro
    await this.pausaRepository.finalizarPausaGeral(pausaGeral.id);
  }
}
