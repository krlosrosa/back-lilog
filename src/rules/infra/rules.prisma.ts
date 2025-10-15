import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { IRulesRepository } from '../domain/repositories/IRules.reposity';
import { CreateRuleDto } from '../dtos/createRule.dto';
import { ListRolesEngine } from '../dtos/listRulesDto';

@Injectable()
export class RulesPrismaRepository implements IRulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(command: CreateRuleDto): Promise<void> {
    await this.prisma.rulesEngines.create({
      data: {
        name: command.name,
        description: command.description,
        centerId: command.centerId,
        enabled: command.enabled,
        conditions: command.conditions,
      },
    });
  }

  async findRulesByCenterId(centerId: string): Promise<ListRolesEngine> {
    const rules = await this.prisma.rulesEngines.findMany({
      where: { centerId },
    });
    return rules;
  }
}
