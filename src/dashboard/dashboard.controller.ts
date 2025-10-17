import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashCentrosUsecase } from './application/dashCentros.usecase';
import { DashCentrosZodDto } from './dtos/dashCentros.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { DashUmCentroUsecase } from './application/dashUmCentro.usecase';
import { DashUmCentrosZodDto } from './dtos/dashUmCentro.dto';
import { BuscarAnomaliaPorCentroUsecase } from './application/buscarAnomaliasPorCentro.usecase';
import { AnomaliaPorCentroZodDto } from './dtos/anomaliaPorCentro.dto';
import { OverViewAcompanhamentoUsecase } from './application/overViewAcompanhamento.usecase';
import { DashBoardDiaPorCentrodtoZodDto } from './dtos/dashBoardDiaPorCentro.dto';
import { ZodResponse } from 'nestjs-zod';
import { DashDaniloUsecase } from './application/dashDaniloProdutividade.useCase';
import { DashDaniloProdutividadeZodDto } from './dtos/dashDaniloProdutividade.dto';
import { DashDaniloPausasUsecase } from './application/dashDaniloPausas.useCase';
import { DashDaniloPausaZodDto } from './dtos/dashDaniloPausas.dto';

// @UseGuards(AuthGuard)
@ApiTags('Dashboard')
// @ApiBearerAuth('access-token')
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(DashCentrosUsecase)
    private readonly dashCentrosUsecase: DashCentrosUsecase,
    @Inject(DashUmCentroUsecase)
    private readonly dashUmCentroUsecase: DashUmCentroUsecase,
    @Inject(BuscarAnomaliaPorCentroUsecase)
    private readonly buscarAnomaliaPorCentroUsecase: BuscarAnomaliaPorCentroUsecase,
    @Inject(OverViewAcompanhamentoUsecase)
    private readonly overView: OverViewAcompanhamentoUsecase,
    @Inject(DashDaniloUsecase)
    private readonly dashDaniloDemanda: DashDaniloUsecase,
    @Inject(DashDaniloPausasUsecase)
    private readonly dashDaniloPausas: DashDaniloPausasUsecase,
  ) {}

  @ApiOperation({
    summary: 'Dashboard de centros',
    operationId: 'dashCentros',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard de centros',
    type: DashCentrosZodDto,
  })
  @ApiCommonErrors()
  @Get('dash-centros')
  async dashCentros(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): Promise<DashCentrosZodDto> {
    return this.dashCentrosUsecase.execute(dataInicio, dataFim);
  }

  @ApiOperation({
    summary: 'Dashboard por centros',
    operationId: 'dashCentroIndividual',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard de centros',
    type: DashUmCentrosZodDto,
  })
  @ApiCommonErrors()
  @Get('dash/:centerId/:processo')
  async dashUmCentros(
    @Param('centerId') centerId: string,
    @Param('processo') processo: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): Promise<DashUmCentrosZodDto> {
    return this.dashUmCentroUsecase.execute(
      dataInicio,
      dataFim,
      centerId,
      processo,
    );
  }

  @ApiOperation({
    summary: 'Buscar anomalias por centro',
    operationId: 'anomaliasPorCentro',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard de centros',
    type: AnomaliaPorCentroZodDto,
  })
  @ApiCommonErrors()
  @Get('anomalias-produtividade/:centerId')
  async anomaliasPorCentro(
    @Param('centerId') centerId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): Promise<AnomaliaPorCentroZodDto> {
    return this.buscarAnomaliaPorCentroUsecase.execute(
      dataInicio,
      dataFim,
      centerId,
    );
  }

  @ApiOperation({
    summary: 'OverViewPorDia',
    operationId: 'overViewDia',
  })
  @ZodResponse({
    type: DashBoardDiaPorCentrodtoZodDto,
    status: 200,
  })
  @ApiCommonErrors()
  @Get('overview-por-centro/:centerId/:data/:processo')
  async overViewPorDia(
    @Param('centerId') centerId: string,
    @Param('data') data: string,
    @Param('processo') processo: string,
  ): Promise<DashBoardDiaPorCentrodtoZodDto> {
    return this.overView.execute(centerId, data, processo);
  }

  @ApiOperation({
    summary: 'Dash Produtividade Danilo',
    operationId: 'dashDaniloDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'DashDemandaDanilo',
    type: DashDaniloProdutividadeZodDto,
  })
  @ApiCommonErrors()
  @Get('demanda-produtividade-danilo/:centerId/:dataInicio/:dataFim')
  async dashDaniloProdutividade(
    @Param('centerId') centerId: string,
    @Param('dataInicio') dataInicio: string,
    @Param('dataFim') dataFim: string,
  ): Promise<DashDaniloProdutividadeZodDto> {
    return this.dashDaniloDemanda.execute(dataInicio, dataFim, centerId);
  }

  @ApiOperation({
    summary: 'Dash lista Pausas Danilo',
    operationId: 'dashDaniloPausas',
  })
  @ApiResponse({
    status: 200,
    description: 'DashPausasDanilo',
    type: DashDaniloPausaZodDto,
  })
  @ApiCommonErrors()
  @Get('demanda-pausas-danilo/:centerId/:dataInicio/:dataFim')
  async dashInfoDaniloPausas(
    @Param('centerId') centerId: string,
    @Param('dataInicio') dataInicio: string,
    @Param('dataFim') dataFim: string,
  ): Promise<DashDaniloPausaZodDto> {
    return this.dashDaniloPausas.execute(dataInicio, dataFim, centerId);
  }
}
