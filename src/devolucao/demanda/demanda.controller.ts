import {
  Controller,
  Inject,
  Post,
  Req,
  UseGuards,
  Param,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { DemandaService } from './demanda.service';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { ReturnInfoGeralRavex } from './dtos/ravex/returnInfoGeralRavex';
import { AddItensEmDemandaDto } from './dtos/ravex/addItensEmDemanda.dto';
import { ResumoDevolucaoDto } from './dtos/resumoItemRetorno';
import { ListarNotasDemandaResponseZodDto } from './dtos/ListarNotasDemandaResponseZod.dto';
import { GetInfoDemandaResponseZodDto } from './dtos/getInfoDemandaResponseZod.dto';

@UseGuards(AuthGuard)
@ApiTags('Devolucao')
@ApiBearerAuth('access-token')
@Controller('api/demanda')
export class DemandaController {
  constructor(
    @Inject(DemandaService)
    private readonly demandaService: DemandaService,
  ) {}

  @ApiOperation({
    summary: 'Liberar demanda armazem',
    operationId: 'liberarDemandaArmazem',
  })
  @ApiResponse({ status: 200, description: 'Demanda liberada' })
  @ApiCommonErrors()
  @Post('liberar-demanda-armazem/:demandaId')
  async liberarDemandaArmazem(
    @Param('demandaId') demandaId: string,
    @Req() req: Request,
  ) {
    return this.demandaService.liberarDemandaArmazem(
      parseInt(demandaId),
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Lista as demandas por data',
    operationId: 'listarDemandasPorData',
  })
  @ApiResponse({
    status: 200,
    description: 'Demandas listadas',
  })
  @ApiCommonErrors()
  @Get('listar-demandas-por-data/:data/:centerId')
  async listarDemandasPorData(
    @Param('data') data: string,
    @Param('centerId') centerId: string,
  ) {
    return this.demandaService.listarDemandasPorData(data, centerId);
  }

  @ApiOperation({
    summary: 'Obtém informações da viagem Ravex',
    operationId: 'getInfoByViagemIdRavex',
  })
  @ApiResponse({
    status: 200,
    type: ReturnInfoGeralRavex,
    description: 'Informações da viagem Ravex',
  })
  @ApiCommonErrors()
  @Get('get-info-by-viagem-id-ravex/:viagemId')
  async getInfoByViagemIdRavex(@Param('viagemId') viagemId: string) {
    return this.demandaService.getInfoByViagemIdRavex(viagemId);
  }

  @ApiOperation({
    summary: 'Adiciona uma nova demanda via Ravex',
    operationId: 'adicionarNovaDemandaViaRavex',
  })
  @ApiResponse({
    status: 200,
    type: Number,
    description: 'Demanda adicionada',
  })
  @ApiCommonErrors()
  @Post('adicionar-nova-demanda-via-ravex/:centerId')
  async adicionarNovaDemandaViaRavex(
    @Body() demandaRavex: ReturnInfoGeralRavex,
    @Req() req: Request,
    @Param('centerId') centerId: string,
  ) {
    return this.demandaService.adicionarNovaDemandaViaRavex(
      demandaRavex,
      centerId,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Adiciona itens em uma demanda via Ravex',
    operationId: 'adicionarItensEmDemandaViaRavex',
  })
  @ApiResponse({
    status: 200,
    description: 'Itens adicionados',
  })
  @ApiCommonErrors()
  @Post('adicionar-itens-em-demanda-via-ravex/:demandaId/:centerId')
  async adicionarItensEmDemandaViaRavex(
    @Body() itens: AddItensEmDemandaDto,
    @Req() req: Request,
    @Param('demandaId') demandaId: string,
    @Param('centerId') centerId: string,
  ) {
    return this.demandaService.adicionarItensEmDemandaViaRavex(
      parseInt(demandaId),
      centerId,
      itens,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Reabre uma demanda',
    operationId: 'reabrirDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda reaberta',
  })
  @ApiCommonErrors()
  @Post('reabrir-demanda/:demandaId')
  async reabrirDemanda(
    @Param('demandaId') demandaId: string,
    @Req() req: Request,
  ) {
    return this.demandaService.reabrirDemanda(
      parseInt(demandaId),
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Deleta uma demanda',
    operationId: 'deletarDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda deletada',
  })
  @ApiCommonErrors()
  @Delete('deletar-demanda/:demandaId')
  async deletarDemanda(@Param('demandaId') demandaId: string) {
    return this.demandaService.deletarDemanda(parseInt(demandaId));
  }

  @ApiOperation({
    summary: 'Finaliza uma demanda',
    operationId: 'finalizarDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda finalizada',
  })
  @ApiCommonErrors()
  @Post('finalizar-demanda/:demandaId')
  async finalizarDemanda(
    @Param('demandaId') demandaId: string,
    @Req() req: Request,
  ) {
    return this.demandaService.finalizarDemanda(
      parseInt(demandaId),
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Obtém o resultado de uma demanda',
    operationId: 'resultadoDemanda',
  })
  @ApiResponse({
    status: 200,
    type: ResumoDevolucaoDto,
  })
  @ApiCommonErrors()
  @Get('resultado-demanda/:demandaId')
  async resultadoDemanda(@Param('demandaId') demandaId: string) {
    return this.demandaService.resultadoDemanda(parseInt(demandaId));
  }

  @ApiOperation({
    summary: 'Lista as notas de uma demanda',
    operationId: 'listarNotasDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Notas listadas',
    type: ListarNotasDemandaResponseZodDto,
  })
  @ApiCommonErrors()
  @Get('listar-notas-demanda/:demandaId')
  async listarNotasDemanda(@Param('demandaId') demandaId: string) {
    return this.demandaService.listarNotasDemanda(parseInt(demandaId));
  }

  @ApiOperation({
    summary: 'Obtém informações da demanda',
    operationId: 'getInfoDemanda',
  })
  @ApiResponse({
    status: 200,
    type: GetInfoDemandaResponseZodDto,
    description: 'Informações da demanda',
  })
  @ApiCommonErrors()
  @Get('get-info-demanda/:demandaId')
  async getInfoDemanda(@Param('demandaId') demandaId: string) {
    return this.demandaService.getInfoDemanda(parseInt(demandaId));
  }
}
