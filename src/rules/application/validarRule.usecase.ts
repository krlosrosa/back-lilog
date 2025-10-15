import { Inject, Injectable } from '@nestjs/common';

import { Engine } from 'json-rules-engine';
import { type IRulesRepository } from '../domain/repositories/IRules.reposity';
import { convertQueryBuilderToRulesEngine } from '../mappers/rules.mapper';

@Injectable()
export class ValidarRuleUsecase {
  constructor(
    @Inject('IRulesRepository')
    private readonly rulesRepository: IRulesRepository,
  ) {}
  async execute(centerId: string): Promise<string> {
    const engine = new Engine();
    {
      /*engine.addRule({
      conditions: rule.conditions,
      event: {
        type: 'validacaoTempoMinimo',
        params: {
          mensagem: 'Regra validada com sucesso',
        },
      },
    });
*/
    }
    const facts = {
      produtividadeMinima: 10,
      statusDemanda: 'PENDENTE',
    };

    return engine.run(facts).then(({ events }) => {
      return events[0]?.params?.mensagem;
    });
  }
}
