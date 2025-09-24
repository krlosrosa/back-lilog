import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Inject,
} from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { ResponseTransportadoraDto } from './dto/responseTransportadora.dto';

@UseGuards(AuthGuard)
@ApiTags('Transportadora')
@ApiBearerAuth('access-token')
@Controller('transportadora')
export class TransportadoraController {
  constructor(
    @Inject(TransportadoraService)
    private readonly transportadoraService: TransportadoraService,
  ) {}

  @ApiOperation({
    summary: 'Adiciona uma nova transportadora',
    operationId: 'adicionarTransportadora',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportadora adicionada com sucesso',
  })
  @ApiCommonErrors()
  @Post('adicionar-transportadora/:centerId')
  create(
    @Body() createTransportadoraDto: { transportadora: string },
    @Param('centerId') centerId: string,
  ) {
    return this.transportadoraService.addNovaTransportadora(
      createTransportadoraDto.transportadora,
      centerId,
    );
  }

  @Get('buscar-transportadoras-por-centro/:centerId')
  @ApiOperation({
    summary: 'Busca todas as transportadoras por centro',
    operationId: 'buscarTransportadorasPorCentro',
  })
  @ApiResponse({
    status: 200,
    type: ResponseTransportadoraDto,
    description: 'Transportadoras encontradas com sucesso',
  })
  @ApiCommonErrors()
  findAll(@Param('centerId') centerId: string) {
    return this.transportadoraService.buscarTransportadorasPorCentro(centerId);
  }

  @ApiOperation({
    summary: 'Edita uma transportadora',
    operationId: 'editarTransportadora',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportadora editada com sucesso',
  })
  @ApiCommonErrors()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Body() updateTransportadoraDto: { transportadora: string },
  ) {
    return this.transportadoraService.editarTransportadora(
      +id,
      updateTransportadoraDto.transportadora,
    );
  }

  @ApiOperation({
    summary: 'Edita uma transportadora',
    operationId: 'editarTransportadora',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportadora editada com sucesso',
  })
  @ApiCommonErrors()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransportadoraDto: { transportadora: string },
  ) {
    return this.transportadoraService.editarTransportadora(
      +id,
      updateTransportadoraDto.transportadora,
    );
  }

  @ApiOperation({
    summary: 'Deleta uma transportadora',
    operationId: 'deletarTransportadora',
  })
  @ApiResponse({
    status: 200,
    description: 'Transportadora deletada com sucesso',
  })
  @ApiCommonErrors()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportadoraService.deletarTransportadora(+id);
  }
}
