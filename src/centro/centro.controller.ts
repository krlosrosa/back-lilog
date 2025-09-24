import {
  Controller,
  Delete,
  Inject,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CentroService } from './centro.service';
// import { CriarNovoCentroDto } from './dto/criarNovoCentro.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { EditarCentroDto } from './dto/editarCentro.dto';
import { DefinirConfiguracaoImpressaoDto } from './dto/definirConfiguracaoCentro.dto';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { CriarNovoCentroZodDto } from './dto/criarNovoCentro.schema';
import { ZodResponse, ZodValidationPipe } from 'nestjs-zod';

@UseGuards(AuthGuard)
@ApiTags('Centro')
@ApiBearerAuth('access-token')
@Controller('api/centro')
export class CentroController {
  constructor(
    @Inject(CentroService)
    private readonly centroService: CentroService,
  ) {}

  @ApiOperation({
    summary: 'Cria um novo centro',
    operationId: 'criarNovoCentro',
  })
  @ZodResponse({ type: CriarNovoCentroZodDto, status: 200 })
  @ApiCommonErrors()
  @Post('criar-novo-centro')
  @UsePipes(ZodValidationPipe)
  async criarNovoCentro(
    @Body() command: CriarNovoCentroZodDto,
  ): Promise<CriarNovoCentroZodDto> {
    return this.centroService.criarNovoCentro(command);
  }

  @ApiOperation({ summary: 'Deleta um centro', operationId: 'deletarCentro' })
  @ApiResponse({
    status: 200,
    description: 'Centro deletado com sucesso',
  })
  @ApiCommonErrors()
  @Delete('deletar-centro/:centerId')
  async deletarCentro(@Param('centerId') centerId: string) {
    return this.centroService.deletarCentro(centerId);
  }

  @ApiOperation({ summary: 'Edita um centro', operationId: 'editarCentro' })
  @ApiResponse({
    status: 200,
    description: 'Centro editado com sucesso',
  })
  @ApiCommonErrors()
  @Put('editar-centro/:centerId')
  async editarCentro(
    @Param('centerId') centerId: string,
    @Body() command: EditarCentroDto,
  ) {
    return this.centroService.editarCentro(centerId, command);
  }

  @ApiOperation({
    summary: 'Define a configuração de impressão',
    operationId: 'definirConfiguracaoImpressao',
  })
  @ApiResponse({
    status: 200,
    description: 'Configuração de impressão definida com sucesso',
  })
  @ApiCommonErrors()
  @Put('definir-configuracao-impressao/:centerId')
  async definirConfiguracaoImpressao(
    @Param('centerId') centerId: string,
    @Body() command: DefinirConfiguracaoImpressaoDto,
    @Req() req: Request,
  ) {
    return this.centroService.definirConfiguracaoImpressao(
      command,
      centerId,
      req['accountId'],
    );
  }

  @ApiOperation({
    summary: 'Busca as configurações de impressão',
    operationId: 'buscarConfiguracoesImpressao',
  })
  @ApiResponse({
    status: 200,
    type: DefinirConfiguracaoImpressaoDto,
    description: 'Configurações de impressão buscadas com sucesso',
  })
  @ApiCommonErrors()
  @Get('buscar-configuracoes-impressao/:centerId')
  async buscarConfiguracoesImpressao(@Param('centerId') centerId: string) {
    return this.centroService.buscarConfiguracoesImpressao(centerId);
  }

  @ApiOperation({
    summary: 'Busca todos os centros',
    operationId: 'buscarTodosOsCentros',
  })
  @ZodResponse({ type: [CriarNovoCentroZodDto], status: 200 })
  @ApiCommonErrors()
  @Get('buscar-todos-os-centros')
  async buscarTodosOsCentros(): Promise<CriarNovoCentroZodDto[]> {
    return this.centroService.buscarTodosOsCentros();
  }
}
