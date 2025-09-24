import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  Delete,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { CreateProdutividadeDto } from './dto/create-produtividade.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { ProdutividadeService } from './produtividade.service';
import { FinalizarProdutividadeDto } from './dto/finalizar-produtividade.dto';
import { AddPausaIndividualDto } from './dto/addPausaIndividual.dto';
import { AddPauseGeralDto } from './dto/addPauseGeral.dto';
import { FinalizarPauseGeralDto } from './dto/finalizarPauseGeral.dto';
import { BuscarProdutividadeZodDto } from './dto/buscarProdutividade.dto';

@UseGuards(AuthGuard)
@ApiTags('Produtividade')
@ApiBearerAuth('access-token')
@Controller('api/produtividade')
export class ProdutividadeController {
  constructor(
    @Inject(ProdutividadeService)
    private readonly produtividadeService: ProdutividadeService,
  ) {}

  @ApiOperation({ summary: 'Inicia um picking' })
  @ApiResponse({ status: 200, description: 'Picking iniciado com sucesso' })
  @ApiCommonErrors()
  @Post('iniciar-demanda/:centerId')
  async iniciarProdutividade(
    @Req() req: Request,
    @Body() command: CreateProdutividadeDto,
    @Param('centerId') centerId: string,
  ) {
    return this.produtividadeService.iniciarProdutividade(
      { ...command, centerId },
      req['accountId'],
    );
  }

  @ApiOperation({ summary: 'Finaliza um picking' })
  @ApiResponse({ status: 200, description: 'Picking finalizado com sucesso' })
  @ApiCommonErrors()
  @Put('finalizar-demanda/:palletId')
  async finalizarPicking(
    @Param('palletId') palletId: string,
    @Body() command: FinalizarProdutividadeDto,
  ) {
    const demanda = await this.produtividadeService.finalizarProdutividade(
      palletId,
      command.observacao,
    );
    return demanda;
  }

  @ApiOperation({ summary: 'Adiciona uma pausa individual' })
  @ApiResponse({
    status: 200,
    description: 'Pausa individual adicionada com sucesso',
  })
  @ApiCommonErrors()
  @Post('adicionar-pausa-individual')
  async addPausaIndividual(
    @Body() command: AddPausaIndividualDto,
    @Req() req: Request,
  ) {
    return this.produtividadeService.addPausaIndividual(
      command,
      req['accountId'],
    );
  }

  @ApiOperation({ summary: 'Finaliza uma pausa individual' })
  @ApiResponse({
    status: 200,
    description: 'Pausa individual finalizada com sucesso',
  })
  @ApiCommonErrors()
  @Put('finalizar-pausa-individual/:palletId')
  async finalizarPausaIndividual(@Param('palletId') palletId: string) {
    return this.produtividadeService.finalizarPausaIndividual(palletId);
  }

  @ApiOperation({
    summary: 'Deleta uma demanda',
    operationId: 'deletarDemanda',
  })
  @ApiResponse({
    status: 200,
    description: 'Demanda deletada com sucesso',
  })
  @ApiCommonErrors()
  @Delete('deletar-demanda/:palletId')
  async deletarDemanda(@Param('palletId') palletId: string) {
    return this.produtividadeService.deletarDemanda(palletId);
  }

  @ApiOperation({ summary: 'Adiciona uma pausa geral' })
  @ApiResponse({
    status: 200,
    description: 'Pausa geral adicionada com sucesso',
  })
  @ApiCommonErrors()
  @Post('adicionar-pausa-geral')
  async addPausaGeral(@Body() command: AddPauseGeralDto, @Req() req: Request) {
    return this.produtividadeService.addPausaGeral(command, req['accountId']);
  }

  @ApiOperation({ summary: 'Finaliza uma pausa geral' })
  @ApiResponse({
    status: 200,
    description: 'Pausa geral finalizada com sucesso',
  })
  @ApiCommonErrors()
  @Put('finalizar-pausa-geral')
  async finalizarPausaGeral(@Body() command: FinalizarPauseGeralDto) {
    return this.produtividadeService.finalizarPausaGeral(command);
  }

  @ApiOperation({ summary: 'Busca produtividade' })
  @ApiResponse({
    status: 200,
    description: 'Produtividade buscada com sucesso',
  })
  @ApiCommonErrors()
  @Get('buscar-produtividade/:centerId')
  async buscarProdutividade(
    @Query() command: BuscarProdutividadeZodDto,
    @Param('centerId') centerId: string,
  ) {
    return this.produtividadeService.buscarProdutividade({
      ...command,
      centerId,
    });
  }
}
