import { Inject, Injectable } from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { DemandasNaoIniciadasZodDto } from 'src/produtividade/dto/demandasNaoFinalizadas.dto';

@Injectable()
export class DemandasNaoFinalizadasUseCase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividade: IProdutividadeRepository,
  ) {}

  async execute(
    centerId: string,
    data: string,
    processo: string,
  ): Promise<DemandasNaoIniciadasZodDto> {
    return this.produtividade.demandasNaoFinalizadas(centerId, data, processo);
  }
}
