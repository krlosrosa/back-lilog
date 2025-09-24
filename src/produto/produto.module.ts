import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { AddProdutoUsecase } from './application/addProduto.usecase';
import { BuscarProdutosUsecase } from './application/buscarProdutos.usecase';
import { BuscarUmProdutoUsecase } from './application/buscarUmProduto.usecase';
import { AtualizarProdutoUsecase } from './application/atualizarProduto.usecase';
import { DeleteProdutoUsecase } from './application/deleteProduto.usecase';
import { ProdutoPrismaRepository } from './infra/prisma/produto-prisma.repository';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    AddProdutoUsecase,
    BuscarProdutosUsecase,
    BuscarUmProdutoUsecase,
    AtualizarProdutoUsecase,
    DeleteProdutoUsecase,
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoPrismaRepository,
    },
  ],
  exports: [
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoPrismaRepository,
    },
  ],
})
export class ProdutoModule {}
