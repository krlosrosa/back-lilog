import { type IProdutoRepository } from 'src/produto/domain/repository/IProduto.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';

@Injectable()
export class BuscarTodosProdutosUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(): Promise<ResponseProdutoDto[]> {
    return await this.produtoRepository.findAll();
  }
}
