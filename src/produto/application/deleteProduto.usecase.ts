import { Inject, Injectable } from '@nestjs/common';
import { type IProdutoRepository } from '../domain/repository/IProduto.repository';

@Injectable()
export class DeleteProdutoUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return await this.produtoRepository.delete(id);
  }
}
