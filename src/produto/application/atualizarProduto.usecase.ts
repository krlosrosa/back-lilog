import { Inject, Injectable } from '@nestjs/common';
import { type IProdutoRepository } from '../domain/repository/IProduto.repository';
import { CreateProdutoZodDto } from '../dto/create-produto.dto';

@Injectable()
export class AtualizarProdutoUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(id: string, produtoParams: CreateProdutoZodDto): Promise<any> {
    return await this.produtoRepository.update(id, produtoParams);
  }
}
