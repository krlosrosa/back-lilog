import { Inject, Injectable } from '@nestjs/common';
import { CriarNovoCentroUsecase } from './application/usecases/criarNovoCentro.usecase';
import { DeletarCentroUsecase } from './application/usecases/deletarCentro.usecase';
import { EditarCentroUsecase } from './application/usecases/editarCentro.usecase';
import { EditarCentroDto } from './dto/editarCentro.dto';
import { DefinirConfiguracaoImpressaoDto } from './dto/definirConfiguracaoCentro.dto';
import { DefinirConfiguracaoImpressaoUsecase } from './application/usecases/definirConfiguracaoImpressa';
import { BuscarConfiguracoesPorCentroUsecase } from './application/usecases/buscarConfiguracoesPorCentro.usecase';
import { BuscarTodosOsCentrosUsecase } from './application/usecases/buscarTodosOsCentros.usecase';
import { CriarNovoCentroZodDto } from './dto/criarNovoCentro.schema';

@Injectable()
export class CentroService {
  constructor(
    @Inject(CriarNovoCentroUsecase)
    private readonly criarNovoCentroUsecase: CriarNovoCentroUsecase,
    @Inject(DeletarCentroUsecase)
    private readonly deletarCentroUsecase: DeletarCentroUsecase,
    @Inject(EditarCentroUsecase)
    private readonly editarCentroUsecase: EditarCentroUsecase,
    @Inject(DefinirConfiguracaoImpressaoUsecase)
    private readonly definirConfiguracaoImpressaoUsecase: DefinirConfiguracaoImpressaoUsecase,
    @Inject(BuscarConfiguracoesPorCentroUsecase)
    private readonly buscarConfiguracoesImpressaoUsecase: BuscarConfiguracoesPorCentroUsecase,
    @Inject(BuscarTodosOsCentrosUsecase)
    private readonly buscarTodosOsCentrosUsecase: BuscarTodosOsCentrosUsecase,
  ) {}

  criarNovoCentro(command: CriarNovoCentroZodDto) {
    return this.criarNovoCentroUsecase.execute(command);
  }

  deletarCentro(centerId: string) {
    return this.deletarCentroUsecase.execute(centerId);
  }

  editarCentro(centerId: string, command: EditarCentroDto) {
    return this.editarCentroUsecase.execute(centerId, command);
  }

  definirConfiguracaoImpressao(
    command: DefinirConfiguracaoImpressaoDto,
    centerId: string,
    atribuidoPorId: string,
  ) {
    return this.definirConfiguracaoImpressaoUsecase.execute(
      command,
      centerId,
      atribuidoPorId,
    );
  }

  buscarConfiguracoesImpressao(centerId: string) {
    return this.buscarConfiguracoesImpressaoUsecase.execute(centerId);
  }

  buscarTodosOsCentros(): Promise<CriarNovoCentroZodDto[]> {
    return this.buscarTodosOsCentrosUsecase.execute();
  }
}
