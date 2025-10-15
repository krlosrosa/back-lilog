import { Inject, Injectable } from '@nestjs/common';
import { type IRulesRepository } from '../domain/repositories/IRules.reposity';
import { ListRolesEngine } from '../dtos/listRulesDto';

@Injectable()
export class ListarRuleUsecase {
  constructor(
    @Inject('IRulesRepository')
    private readonly rulesRepository: IRulesRepository,
  ) {}
  async execute(centerId: string): Promise<ListRolesEngine> {
    const rules = await this.rulesRepository.findRulesByCenterId(centerId);
    return rules;
  }
}
