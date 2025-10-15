import { Module } from '@nestjs/common';
import { AnomaliasProdutividadeService } from './anomalias_produtividade.service';
import { AnomaliaPrismaProdutividadePrismaRepository } from './infra/prisma/anomaliaProdutividade.infra';
import { CriarAnomaliaProdutividadeUsecase } from './application/criarAnomaliaProdutividade';
import { RulesPrismaRepository } from 'src/rules/infra/rules.prisma';

@Module({
  providers: [
    AnomaliasProdutividadeService,
    CriarAnomaliaProdutividadeUsecase,
    {
      provide: 'IAnomaliaProdutividade',
      useClass: AnomaliaPrismaProdutividadePrismaRepository,
    },
    {
      provide: 'IRulesRepository',
      useClass: RulesPrismaRepository,
    },
  ],
  controllers: [],
})
export class AnomaliasProdutividadeModule {}
