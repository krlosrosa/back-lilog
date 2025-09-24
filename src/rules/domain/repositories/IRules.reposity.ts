import { CreateRuleDto } from 'src/rules/dtos/createRule.dto';

export interface IRulesRepository {
  create(command: CreateRuleDto): Promise<void>;
  findRulesByCenterId(centerId: string): Promise<CreateRuleDto>;
}
