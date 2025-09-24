import { Inject, Injectable } from '@nestjs/common';
import { type IProdutoRepository } from '../domain/repository/IProduto.repository';

@Injectable()
export class BuscarProdutosUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(): Promise<any> {
    return await this.produtoRepository.findAll();
  }
}
