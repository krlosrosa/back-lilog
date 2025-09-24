import { CreateProdutoZodDto } from 'src/produto/dto/create-produto.dto';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';

export interface IProdutoRepository {
  create(produto: CreateProdutoZodDto): Promise<string>;
  findAll(): Promise<ResponseProdutoDto[]>;
  findOne(id: string): Promise<ResponseProdutoDto>;
  update(id: string, produto: CreateProdutoZodDto): Promise<any>;
  delete(id: string): Promise<void>;
  buscarProdutoPorSkus(skus: string[]): Promise<ResponseProdutoDto[]>;
}
