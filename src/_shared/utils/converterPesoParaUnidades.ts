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

  if (sku === '610100510') {
    console.log('pesoLiquido', pesoLiquido);
    console.log('produto?.pesoLiquidoUnidade', produto?.pesoLiquidoUnidade);
    console.log('unidades', unidades);
    console.log('caixas', caixas);
    console.log('rest', rest);
  }

  return {
    caixas: caixas,
    unidades: rest,
    fatorConversao: Number(produto?.pesoLiquidoUnidade ?? 0),
    unPorCaixa: Number(produto?.unPorCaixa ?? 0),
    decimal: unidades,
  };
}
