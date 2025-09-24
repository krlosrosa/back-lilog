import { Inject, Injectable } from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import {
  OverViewProdutividadeResponseZodDto,
  OverViewProdutividadeZodDto,
} from 'src/produtividade/dto/overViewProdutividade.dto';

@Injectable()
export class OverViewUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
  ) {}

  async execute(
    command: OverViewProdutividadeZodDto,
  ): Promise<OverViewProdutividadeResponseZodDto> {
    return this.produtividadeRepository.overViewProdutividade(command);
  }
}
