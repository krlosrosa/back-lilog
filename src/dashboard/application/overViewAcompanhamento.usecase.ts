import { Inject, Injectable } from '@nestjs/common';
import { type IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import {
  DashBoardDiaPorCentrodtoZodDto,
  DashDemandaLonga,
  DashFuncionario,
  DashPausa,
} from '../dtos/dashBoardDiaPorCentro.dto';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';

@Injectable()
export class OverViewAcompanhamentoUsecase {
  constructor(
    @Inject('IProdutividadeRepository')
    private readonly produtividade: IProdutividadeRepository,
  ) {}
  async execute(
    centerId: string,
    data: string,
    processo: string,
  ): Promise<DashBoardDiaPorCentrodtoZodDto> {
    const produtividade = await this.produtividade.findDemandasByCenter(
      centerId,
      data,
      processo,
    );

    const topCinco: DashFuncionario[] = topFuncionariosPorProdutividade(
      produtividade,
      'melhores',
    );
    const topCincoPiores: DashFuncionario[] = topFuncionariosPorProdutividade(
      produtividade,
      'piores',
    );

    const overView = gerarOverviewDemandas(produtividade);
    const pausas: DashPausa[] = listarPausasLongas(produtividade);
    const demandas: DashDemandaLonga[] =
      listarDemandasAtivasComTempo(produtividade);
    const produtividadeHoraAhora = gerarProdutividadeHoraHora(produtividade);

    return {
      overView,
      anomaliaDemanda: demandas,
      anomaliaPausa: pausas,
      pioresCinco: topCincoPiores,
      topCinco: topCinco,
      horaAHora: produtividadeHoraAhora,
    };
  }
}

export function topFuncionariosPorProdutividade(
  demandas: DemandaEntity[],
  ordem: 'melhores' | 'piores' = 'melhores',
  limite = 5,
) {
  const demandasFiltradas = demandas
    .filter(
      (d) => d.status === StatusDemanda.FINALIZADA && d.quantidadeCaixas() > 0,
    )
    .map((d) => ({
      id: d.funcionarioId,
      nome: d.funcionario,
      turno: d.turno,
      caixas: d.quantidadeCaixas(),
      paletes: d.quantidadePaletes(),
      unidades: d.quantidadeUnidades(),
      visitar: d.quantidadeVisitas(),
      produtividade: d.calcularProdutividade(),
    }));

  // define a direção da ordenação
  const ordenadas = demandasFiltradas.sort((a, b) =>
    ordem === 'melhores'
      ? b.produtividade - a.produtividade
      : a.produtividade - b.produtividade,
  );

  return ordenadas.slice(0, limite);
}

export function gerarOverviewDemandas(demandas: DemandaEntity[]) {
  const totalDemandas = demandas.length;

  const totalEmAndamento = demandas.filter(
    (d) => d.status === StatusDemanda.EM_PROGRESSO,
  ).length;

  const totalEmpausa = demandas.filter(
    (d) => d.status === StatusDemanda.PAUSA,
  ).length;

  const totalFinalizado = demandas.filter(
    (d) => d.status === StatusDemanda.FINALIZADA,
  ).length;

  const totalCaixas = demandas.reduce(
    (acc, d) => acc + d.quantidadeCaixas(),
    0,
  );
  const totalUnidades = demandas.reduce(
    (acc, d) => acc + d.quantidadeUnidades(),
    0,
  );

  // média de visitas (endereços) por demanda
  const somaVisitas = demandas.reduce(
    (acc, d) => acc + d.quantidadeVisitas(),
    0,
  );
  const mediaEnderecosVisitados =
    totalDemandas > 0 ? somaVisitas / totalDemandas : 0;

  return {
    totalDemandas,
    totalEmAndamento,
    totalEmpausa,
    totalFinalizado,
    totalCaixas,
    totalUnidades,
    mediaEnderecosVisitados: Number(mediaEnderecosVisitados.toFixed(2)),
  };
}

export function listarPausasLongas(demandas: DemandaEntity[]) {
  const agora = new Date();
  const MILIS_POR_MINUTO = 1000 * 60;

  const pausasLongas = demandas.flatMap((demanda) =>
    (demanda.pausas ?? [])
      .filter((pausa) => {
        const aindaEmPausa = !pausa.fim;
        if (!aindaEmPausa) return false;

        const tempoMin =
          (agora.getTime() - pausa.inicio.getTime()) / MILIS_POR_MINUTO;

        // regra: térmica > 30min, outras > 60min
        if (pausa.motivo === 'PAUSA_TERMICA' && tempoMin > 30) return true;
        if (pausa.motivo !== 'PAUSA_TERMICA' && tempoMin > 60) return true;

        return false;
      })
      .map((pausa) => ({
        id: demanda.funcionarioId,
        nome: demanda.funcionario,
        turno: demanda.turno,
        motivoPausa: pausa.motivo,
        tempoDePausa:
          (agora.getTime() - pausa.inicio.getTime()) / MILIS_POR_MINUTO,
      })),
  );

  return pausasLongas;
}

export function listarDemandasAtivasComTempo(
  demandas: DemandaEntity[],
  limiteMinutos = 2,
): DashDemandaLonga[] {
  const MILIS_POR_MINUTO = 1000 * 60;
  const demandasFiltradas = demandas
    .filter((d) => d.status !== StatusDemanda.FINALIZADA)
    .filter((d) => {
      const tempoTrabalhadoMs = d.calcularTempoTrabalhado();
      const tempoPorEndereco = d.quantidadeVisitas() / tempoTrabalhadoMs;
      const tempoTrabalhadoMin = tempoPorEndereco / MILIS_POR_MINUTO;
      return tempoTrabalhadoMin > limiteMinutos;
    })
    .map((d) => ({
      id: d.funcionarioId,
      nome: d.funcionario,
      turno: d.turno,
      data: d.dataRegistro,
      tempoDemanda: d.calcularTempoTrabalhado(),
      caixas: d.quantidadeCaixas(),
      unidade: d.quantidadeUnidades(),
      paletes: d.quantidadePaletes(),
      visitas: d.quantidadeVisitas(),
      produtividade: d.calcularProdutividade(),
    }));

  return demandasFiltradas;
}

export function gerarProdutividadeHoraHora(demandas: DemandaEntity[]) {
  const agrupadoPorHora: Record<
    string,
    {
      caixas: number;
      unidades: number;
      paletes: number;
      visitas: number;
      tempoTrabalhado: number;
    }
  > = {};

  for (const demanda of demandas) {
    if (demanda.status !== StatusDemanda.FINALIZADA) continue;

    // Agrupamento pela hora da finalização
    const dataHora = demanda.fim ?? demanda.inicio;
    const horaFormatada = new Date(dataHora).toISOString().slice(0, 13) + ':00';

    if (!agrupadoPorHora[horaFormatada]) {
      agrupadoPorHora[horaFormatada] = {
        caixas: 0,
        unidades: 0,
        paletes: 0,
        visitas: 0,
        tempoTrabalhado: 0,
      };
    }

    agrupadoPorHora[horaFormatada].caixas += demanda.quantidadeCaixas();
    agrupadoPorHora[horaFormatada].unidades += demanda.quantidadeUnidades();
    agrupadoPorHora[horaFormatada].paletes += demanda.quantidadePaletes();
    agrupadoPorHora[horaFormatada].visitas += demanda.quantidadeVisitas();
    agrupadoPorHora[horaFormatada].tempoTrabalhado +=
      demanda.calcularTempoTrabalhado();
  }

  const resultado = Object.entries(agrupadoPorHora).map(([data, valores]) => {
    const horasTrabalhadas = valores.tempoTrabalhado / 3600000; // ms → horas
    const produtividade =
      horasTrabalhadas > 0 ? valores.caixas / horasTrabalhadas : 0;

    return {
      data,
      caixas: valores.caixas,
      unidades: valores.unidades,
      paletes: valores.paletes,
      visitas: valores.visitas,
      produtividade: Number(produtividade.toFixed(2)),
    };
  });

  // ordena cronologicamente
  resultado.sort((a, b) => a.data.localeCompare(b.data));

  return resultado;
}
