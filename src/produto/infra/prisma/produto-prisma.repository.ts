import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { IProdutoRepository } from 'src/produto/domain/repository/IProduto.repository';
import { CreateProdutoZodDto } from 'src/produto/dto/create-produto.dto';

@Injectable()
export class ProdutoPrismaRepository implements IProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(produtoParams: CreateProdutoZodDto): Promise<string> {
    const produto = await this.prisma.produto.create({
      data: produtoParams,
    });
    return produto.sku;
  }
  async findAll(): Promise<any[]> {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: string): Promise<any> {
    return await this.prisma.produto.findUnique({
      where: { sku: id },
    });
  }

  async update(id: string, produtoParams: CreateProdutoZodDto): Promise<any> {
    return await this.prisma.produto.update({
      where: { sku: id },
      data: produtoParams,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.produto.delete({
      where: { sku: id },
    });
  }

  async buscarProdutoPorSkus(skus: string[]): Promise<any> {
    return await this.prisma.produto.findMany({
      where: { sku: { in: skus } },
    });
  }

  async buscarTodosProdutos(): Promise<any> {
    return await this.prisma.produto.findMany();
  }
}
