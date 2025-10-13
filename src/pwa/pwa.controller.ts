import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PwaService } from './pwa.service';
import { StartDemandaZodDto } from './dtos/startDemanda.dto';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { ResponseStartDemandaZodDto } from './dtos/responseStartDemanda.dto';
import { ListaDemandasZodDto } from './dtos/listaDemandas.dto';
import { ResponseProdutoDto } from 'src/produto/dto/response-produto.dto';
import { ContabilByIdResponseZodDto } from '../devolucao/demanda/dtos/contabilByIdResponseZod.dto';
import {
  FinalizarDemandaDevolucaoZodDto,
  FinalizarDemandaDevolucaoZodDtoSchema,
} from './dtos/finalizarDemandaDevolucao.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('PWA')
// @ApiBearerAuth('access-token')
//@UseGuards(AuthGuard)
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

  @ApiOperation({
    summary: 'Obtém informações da contabilidade',
    operationId: 'getContabilById',
  })
  @ApiResponse({
    status: 200,
    type: ContabilByIdResponseZodDto,
  })
  @ApiCommonErrors()
  @Get('get-contabil-by-id/:demandaId')
  async getContabilById(@Param('demandaId') demandaId: string) {
    return this.pwaService.getContabilById(parseInt(demandaId));
  }

  @ApiOperation({
    summary: 'Finaliza uma conferência de demanda',
    operationId: 'finalizarDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda finalizada com sucesso',
  })
  @ApiCommonErrors()
  @Post('finalizar-demanda/:demandaId')
  async finalizarDemanda(
    @Param('demandaId') demandaId: string,
    @Body() body: FinalizarDemandaDevolucaoZodDto,
  ) {
    const parse = FinalizarDemandaDevolucaoZodDtoSchema.parse(body);
    return this.pwaService.finalizarDemanda(demandaId, parse);
  }

  @ApiOperation({
    summary: 'Processa imagens de uma demanda',
    operationId: 'processarImagensDemanda',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Imagens processadas com sucesso',
  })
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Post('processar-imagens-demanda/:demandaId')
  @UseInterceptors(FilesInterceptor('files', 10)) // até 10 arquivos
  async processarImagensDemanda(
    @Param('demandaId') demandaId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      return this.pwaService.processarImagensDemanda(demandaId, files);
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      throw error;
    }
  }
}
