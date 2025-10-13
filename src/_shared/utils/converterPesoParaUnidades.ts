import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';

export function converterPesoParaUnidades(
  sku: string,
  pesoLiquido: number,
  lista: ResponseProdutoDto[],
) {
  const produto = lista.find((produto) => produto.sku === sku);
  const unidades =
    Math.round(
      (pesoLiquido / Number(produto?.pesoLiquidoUnidade ?? 0)) * 1000,
    ) / 1000;
  const caixas = Math.ceil(unidades / Number(produto?.unPorCaixa ?? 0));
  const rest = Math.ceil(unidades % Number(produto?.unPorCaixa ?? 0));

  return {
    caixas: caixas,
    unidades: rest,
    fatorConversao: Number(produto?.pesoLiquidoUnidade ?? 0),
    unPorCaixa: Number(produto?.unPorCaixa ?? 0),
    decimal: unidades,
  };
}
