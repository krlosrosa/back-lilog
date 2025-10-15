import { CreateRuleDto } from 'src/rules/dtos/createRule.dto';
import { ListRolesEngine } from 'src/rules/dtos/listRulesDto';

export interface IRulesRepository {
  create(command: CreateRuleDto): Promise<void>;
  findRulesByCenterId(centerId: string): Promise<ListRolesEngine>;
}
