import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { PwaService } from './pwa.service';
import { StartDemandaZodDto } from './dtos/startDemanda.dto';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { ResponseStartDemandaZodDto } from './dtos/responseStartDemanda.dto';
import { ListaDemandasZodDto } from './dtos/listaDemandas.dto';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';

@ApiTags('PWA')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('pwa')
export class PwaController {
  constructor(private readonly pwaService: PwaService) {}

  @ApiOperation({
    summary: 'Inicia uma conferência de demanda',
    operationId: 'iniciarConferenciaDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Conferência de demanda iniciada com sucesso',
    type: ResponseStartDemandaZodDto,
  })
  @ApiCommonErrors()
  @Post('iniciar-conferencia-demanda')
  async iniciarConferenciaDemanda(
    @Body() body: StartDemandaZodDto,
    @Req() req: Request,
  ) {
    return this.pwaService.startDemanda(
      Number(body.demandaId),
      body.horaInicio,
      body.doca,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Busca todas as demandas por centro e status',
    operationId: 'buscarDemandas',
  })
  @ApiResponse({
    status: 200,
    description: 'Demandas encontradas com sucesso',
    type: ListaDemandasZodDto,
  })
  @Get('buscar-todas-demandas-por-centro-e-status/:centerId')
  async buscarTodasDemandasPorCentroEStatus(
    @Param('centerId') centerId: string,
    @Req() req: Request,
  ) {
    return this.pwaService.buscarTodasDemandasPorCentroEStatus(
      centerId,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Busca todos os produtos',
    operationId: 'buscarTodosProdutos',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtos encontrados com sucesso',
    type: [ResponseProdutoDto],
  })
  @ApiCommonErrors()
  @Get('buscar-todos-produtos')
  async buscarTodosProdutos(): Promise<ResponseProdutoDto[]> {
    return this.pwaService.buscarTodosProdutos();
  }
}
