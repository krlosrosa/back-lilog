import { Inject, Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dtos/createRule.dto';
import { ValidarRuleUsecase } from './application/validarRule.usecase';
import { CreateRuleUsecase } from './application/createRule.usecase';

@Injectable()
export class RulesService {
  constructor(
    @Inject(CreateRuleUsecase)
    private readonly createRuleUsecase: CreateRuleUsecase,
    @Inject(ValidarRuleUsecase)
    private readonly validarRuleUsecase: ValidarRuleUsecase,
  ) {}

  createRule(command: CreateRuleDto) {
    return this.createRuleUsecase.execute(command);
  }

  validarRule(rule: string) {
    return this.validarRuleUsecase.execute(rule);
  }
}
