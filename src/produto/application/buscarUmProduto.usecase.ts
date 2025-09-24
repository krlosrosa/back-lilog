import { Inject, Injectable } from '@nestjs/common';
import { type IProdutoRepository } from '../domain/repository/IProduto.repository';

@Injectable()
export class BuscarUmProdutoUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(id: string): Promise<any> {
    return await this.produtoRepository.findOne(id);
  }
}
