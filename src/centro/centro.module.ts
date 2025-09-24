import { Module } from '@nestjs/common';
import { CentroController } from './centro.controller';
import { CentroService } from './centro.service';
import { CriarNovoCentroUsecase } from './application/usecases/criarNovoCentro.usecase';
import { DeletarCentroUsecase } from './application/usecases/deletarCentro.usecase';
import { EditarCentroUsecase } from './application/usecases/editarCentro.usecase';
import { CenterPrismaRepository } from './infra/prisma/center-prisma.repository';
import { DefinirConfiguracaoImpressaoUsecase } from './application/usecases/definirConfiguracaoImpressa';
import { BuscarConfiguracoesPorCentroUsecase } from './application/usecases/buscarConfiguracoesPorCentro.usecase';
import { BuscarTodosOsCentrosUsecase } from './application/usecases/buscarTodosOsCentros.usecase';

@Module({
  controllers: [CentroController],
  providers: [
    {
      provide: 'ICenterRepository',
      useClass: CenterPrismaRepository,
    },
    CentroService,
    CriarNovoCentroUsecase,
    DeletarCentroUsecase,
    EditarCentroUsecase,
    DefinirConfiguracaoImpressaoUsecase,
    BuscarConfiguracoesPorCentroUsecase,
    BuscarTodosOsCentrosUsecase,
  ],
})
export class CentroModule {}
