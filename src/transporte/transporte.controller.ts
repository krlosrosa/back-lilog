import {
  Body,
  Controller,
  Inject,
  Param,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransporteService } from './transporte.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { ItensDoTransporteZodDto } from './dto/itensDoTransporte.dtos';
import { ZodResponse } from 'nestjs-zod';
import { PaleteInputZodDto } from './dto/adicionarPalete';
import { TransportInfoZodDto } from './dto/adicionarTransporte.dto';

@UseGuards(AuthGuard)
@ApiTags('Transporte')
@ApiBearerAuth('access-token')
@Controller('api/transporte')
export class TransporteController {
  @Inject(TransporteService)
  private readonly transporteService: TransporteService;

  @ApiOperation({
    summary: 'Adiciona um transporte',
    operationId: 'adicionarTransporte',
  })
  @ApiResponse({
    status: 200,
    description: 'Transporte adicionado com sucesso',
  })
  @ApiCommonErrors()
  @Post('adicionar-transporte/:centerId')
  async adicionarTransporte(
    @Body() command: TransportInfoZodDto,
    @Req() req: Request,
    @Param('centerId') centerId: string,
    @Query('dataExpedicao') dataExpedicao: Date,
  ) {
    return this.transporteService.adicionarTransporte(
      command,
      centerId,
      dataExpedicao,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Obtém os transportes por ids',
    operationId: 'getTransportesByIds',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportes obtidos com sucesso',
  })
  @ApiCommonErrors()
  @Post('get-transportes-by-ids')
  async getTransportesByIds(@Body() ids: string[]) {
    return this.transporteService.getTransportesByIds(ids);
  }

  @ApiOperation({
    summary: 'Adiciona paletes de separação',
    operationId: 'adicionarPaletesSeparacao',
  })
  @ApiResponse({
    status: 200,
    description: 'Paletes de separação adicionadas com sucesso',
  })
  @ApiCommonErrors()
  @Post('adicionar-paletes')
  async adicionarPaletesSeparacao(
    @Body() command: PaleteInputZodDto,
    @Req() req: Request,
  ) {
    const result = await this.transporteService.adicionarPaletesSeparacao(
      command,
      req['accountId'],
    );
    console.log(result);
    return result;
  }

  @ApiOperation({
    summary: 'Lista os transportes não cadastrados',
    operationId: 'listarTransportesNaoCadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportes não cadastrados listados com sucesso',
  })
  @ApiCommonErrors()
  @Post('listar-nao-cadastrados')
  async listarNaoCadastrados(@Body() ids: string[]) {
    return this.transporteService.listarNaoCadastados(ids);
  }

  @ApiOperation({ summary: 'Guarda as inte de separação' })
  @ApiResponse({
    status: 200,
    description: 'Intes de separação guardadas com sucesso',
  })
  @ApiCommonErrors()
  @ApiBody({
    type: [Object],
    description: 'Intes de separação',
  })
  @Post('guardar-intes-separacao')
  async guardarIntesSeparacao(@Body() inte: { key: string; value: string }[]) {
    return this.transporteService.guardarIntesSeparacao(inte);
  }

  @ApiOperation({ summary: 'Busca os itens por transporte' })
  @ZodResponse({ type: ItensDoTransporteZodDto, status: 200 })
  @ApiCommonErrors()
  @Get('buscar-itens-por-transporte/:transporteId')
  async buscarItensPorTransporte(
    @Param('transporteId') transporteId: string,
  ): Promise<ItensDoTransporteZodDto> {
    return this.transporteService.buscarItensPorTransporte(transporteId);
  }

  @ApiOperation({ summary: 'Busca os transportes por data' })
  @ApiResponse({
    status: 200,
    description: 'Transportes por data buscados com sucesso',
  })
  @ApiCommonErrors()
  @Get('buscar-transporte-por-data/:centerId')
  async buscarTransportePorData(
    @Query('data') data: string,
    @Param('centerId') centerId: string,
  ) {
    return this.transporteService.buscarTransportePorData(data, centerId);
  }

  @ApiOperation({
    summary: 'Lista os transportes com demanda iniciada',
    operationId: 'listarTransportesComDemandaIniciada',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportes com demanda iniciada listados com sucesso',
    type: [String],
  })
  @ApiCommonErrors()
  @Post('listar-transportes-com-demanda-iniciada')
  async listarTransportesComDemandaIniciada(@Body() ids: string[]) {
    return this.transporteService.listarTransportesComDemandaIniciada(ids);
  }
}
