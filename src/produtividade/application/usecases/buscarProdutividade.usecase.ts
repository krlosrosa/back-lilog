import { Inject, Injectable } from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { BuscarProdutividadeZodDto } from 'src/produtividade/dto/buscarProdutividade.dto';

@Injectable()
export class BuscarProdutividadeUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividadeRepository: IProdutividadeRepository,
  ) {}

  async execute(command: BuscarProdutividadeZodDto) {
    return this.produtividadeRepository.buscarProdutividade(command);
  }
}
