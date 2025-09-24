import { Inject, Injectable } from '@nestjs/common';
import { CreateProdutoZodDto } from './dto/create-produto.dto';
import { AddProdutoUsecase } from './application/addProduto.usecase';
import { BuscarProdutosUsecase } from './application/buscarProdutos.usecase';
import { BuscarUmProdutoUsecase } from './application/buscarUmProduto.usecase';
import { AtualizarProdutoUsecase } from './application/atualizarProduto.usecase';
import { DeleteProdutoUsecase } from './application/deleteProduto.usecase';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject(AddProdutoUsecase)
    private readonly addProdutoUsecase: AddProdutoUsecase,
    @Inject(BuscarProdutosUsecase)
    private readonly buscarProdutosUsecase: BuscarProdutosUsecase,
    @Inject(BuscarUmProdutoUsecase)
    private readonly buscarUmProdutoUsecase: BuscarUmProdutoUsecase,
    @Inject(AtualizarProdutoUsecase)
    private readonly atualizarProdutoUsecase: AtualizarProdutoUsecase,
    @Inject(DeleteProdutoUsecase)
    private readonly deleteProdutoUsecase: DeleteProdutoUsecase,
  ) {}

  create(createProdutoDto: CreateProdutoZodDto) {
    return this.addProdutoUsecase.execute(createProdutoDto);
  }

  findAll() {
    return this.buscarProdutosUsecase.execute();
  }

  findOne(id: string) {
    return this.buscarUmProdutoUsecase.execute(id);
  }

  update(id: string, updateProdutoDto: CreateProdutoZodDto) {
    return this.atualizarProdutoUsecase.execute(id, updateProdutoDto);
  }

  remove(id: string) {
    return this.deleteProdutoUsecase.execute(id);
  }
}
