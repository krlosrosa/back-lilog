import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Processo, Turno } from '../../enums/produtividade.enums';
import { type IPausaRepository } from 'src/produtividade/domain/repositories/iPausaRepository';

export interface AddPausaGeral {
  cadastradoPorId: string;
  centerId: string;
  turno: Turno;
  processo: Processo;
  segmento: string;
  motivo: string;
}

@Injectable()
export class AddPausaGeralUsecase {
  constructor(
    @Inject('IPausaRepository')
    private readonly pausaRepository: IPausaRepository,
  ) {}

  async execute(command: AddPausaGeral) {
    // Verificar se tem pausa geral ativa
    const pausaGeral =
      await this.pausaRepository.buscarPausaGeralAtiva(command);
    // se tiver lançar um erro
    if (pausaGeral) {
      throw new BadRequestException('Já existe uma pausa geral ativa');
    }

    // se não tiver, adicionar a pausa geral
    return this.pausaRepository.adicionarPausaGeral(command);
  }
}
