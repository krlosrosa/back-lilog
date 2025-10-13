import { Module } from '@nestjs/common';
import { AnomaliasProdutividadeService } from './anomalias_produtividade.service';
import { AnomaliaPrismaProdutividadePrismaRepository } from './infra/prisma/anomaliaProdutividade.infra';
import { CriarAnomaliaProdutividadeUsecase } from './application/criarAnomaliaProdutividade';

@Module({
  providers: [
    AnomaliasProdutividadeService,
    CriarAnomaliaProdutividadeUsecase,
    {
      provide: 'IAnomaliaProdutividade',
      useClass: AnomaliaPrismaProdutividadePrismaRepository,
    },
  ],
  controllers: [],
})
export class AnomaliasProdutividadeModule {}
