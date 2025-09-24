import { Inject, Injectable } from '@nestjs/common';
import { type IRulesRepository } from '../domain/repositories/IRules.reposity';
import { CreateRuleDto } from '../dtos/createRule.dto';
import { convertQueryBuilderToRulesEngine } from '../mappers/rules.mapper';

@Injectable()
export class CreateRuleUsecase {
  constructor(
    @Inject('IRulesRepository')
    private readonly rulesRepository: IRulesRepository,
  ) {}
  async execute(command: CreateRuleDto): Promise<string> {
    const ruleEngine = convertQueryBuilderToRulesEngine(command.conditions);
    console.log({ ruleEngine });
    await this.rulesRepository.create({ ...command, conditions: ruleEngine });
    return 'Regra criada com sucesso';
  }
}
