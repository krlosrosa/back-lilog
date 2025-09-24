import { Inject, Injectable } from '@nestjs/common';
import { type IProdutoRepository } from '../domain/repository/IProduto.repository';
import { CreateProdutoZodDto } from '../dto/create-produto.dto';

@Injectable()
export class AddProdutoUsecase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(command: CreateProdutoZodDto): Promise<string> {
    return await this.produtoRepository.create(command);
  }
}
