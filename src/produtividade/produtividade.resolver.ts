import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { ProdutividadeService } from './produtividade.service';
import { Inject, UseGuards } from '@nestjs/common';
import {
  InputProdutividadeModelGraph,
  ProdutividadeModel,
} from './models/produtividade.model.zod';
import { GqlAuthGuard } from 'src/_shared/auth/gql.guard';
import {
  InputOverViewModelGraph,
  OverViewModel,
} from './models/overView.model';
import { OverViewProdutividadeResponseZodDto } from './dto/overViewProdutividade.dto';
import { InfoDemandaModel } from './models/infoDemanda.model';
import { BuscarInfoDemandaResponseZodDto } from './dto/buscarInfoDemanda.dto';

@Resolver()
export class ProdutividadeResolver {
  constructor(
    @Inject(ProdutividadeService)
    private readonly produtividadeService: ProdutividadeService,
  ) {}

  @Query(() => [ProdutividadeModel])
  @UseGuards(GqlAuthGuard)
  async produtividade(
    @Context() context,
    @Args('buscarProdutividadeCommand')
    buscarProdutividadeCommand: InputProdutividadeModelGraph,
  ): Promise<ProdutividadeModel[]> {
    const produtividade = await this.produtividadeService.buscarProdutividade({
      ...buscarProdutividadeCommand,
    });
    return produtividade.map((produtividade) => {
      return {
        centerId: produtividade.centerId,
        processo: produtividade.processo,
        inicio: produtividade.inicio.toISOString(),
        fim: produtividade.fim?.toISOString() ?? null,
        cadastradoPorId: produtividade.cadastradoPorId,
        turno: produtividade.turno,
        funcionarioId: produtividade.funcionarioId,
        nomeFuncionario: produtividade.funcionario,
        empresa: produtividade.empresa,
        segmento: produtividade.segmento,
        idDemanda: produtividade.id,
        caixas: produtividade.quantidadeCaixas(),
        unidades: produtividade.quantidadeUnidades(),
        paletes: produtividade.quantidadePaletes(),
        pausas: produtividade.quantidadePausas(),
        produtividade: produtividade.calcularProdutividade(),
        statusDemanda: produtividade.status,
        tempoPausas: produtividade.calcularTempoPausas(),
        tempoTotal: produtividade.calcularTempoTotal(),
        visitas: produtividade.quantidadeVisitas(),
        tempoTrabalhado: produtividade.calcularTempoTrabalhado(),
      };
    });
  }

  @Query(() => OverViewModel)
  @UseGuards(GqlAuthGuard)
  async overViewProdutividade(
    @Context() context,
    @Args('overViewProdutividadeCommand')
    overViewProdutividadeCommand: InputOverViewModelGraph,
  ): Promise<OverViewProdutividadeResponseZodDto> {
    return this.produtividadeService.overViewProdutividade(
      overViewProdutividadeCommand,
    );
  }

  @Query(() => InfoDemandaModel)
  @UseGuards(GqlAuthGuard)
  async infoDemanda(
    @Context() context,
    @Args('paleteId')
    paleteId: string,
  ): Promise<BuscarInfoDemandaResponseZodDto> {
    return this.produtividadeService.buscarInfoDemanda(paleteId);
  }
}
