import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesPrismaRepository } from './infra/rules.prisma';
import { CreateRuleUsecase } from './application/createRule.usecase';
import { RulesController } from './rules.controller';
import { ValidarRuleUsecase } from './application/validarRule.usecase';
import { ListarRuleUsecase } from './application/listarRules.usecase';

@Module({
  providers: [
    RulesService,
    CreateRuleUsecase,
    ValidarRuleUsecase,
    ListarRuleUsecase,
    {
      provide: 'IRulesRepository',
      useClass: RulesPrismaRepository,
    },
  ],
  controllers: [RulesController],
})
export class RulesModule {}
