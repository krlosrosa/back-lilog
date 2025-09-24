import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';

export function verificarDescricaoProduto(
  sku: string,
  lista: ResponseProdutoDto[],
): string {
  const produto = lista.find((produto) => produto.sku === sku);
  return produto?.descricao || 'produto não encontrado';
}
