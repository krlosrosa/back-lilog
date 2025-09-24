import { Inject, Injectable } from '@nestjs/common';

import { Engine } from 'json-rules-engine';
import { type IRulesRepository } from '../domain/repositories/IRules.reposity';

@Injectable()
export class ValidarRuleUsecase {
  constructor(
    @Inject('IRulesRepository')
    private readonly rulesRepository: IRulesRepository,
  ) {}
  async execute(centerId: string): Promise<string> {
    const rule = await this.rulesRepository.findRulesByCenterId(centerId);

    console.log(rule.conditions);
    const engine = new Engine();
    engine.addRule({
      conditions: rule.conditions,
      event: {
        type: 'validacaoTempoMinimo',
        params: {
          mensagem: 'Regra validada com sucesso',
        },
      },
    });

    const facts = {
      produtividadeMinima: 10,
      statusDemanda: 'PENDENTE',
    };

    return engine.run(facts).then(({ events }) => {
      console.log(events);
      return events[0]?.params?.mensagem;
    });
  }
}
