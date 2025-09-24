import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { IRulesRepository } from '../domain/repositories/IRules.reposity';
import { CreateRuleDto } from '../dtos/createRule.dto';

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

  async findRulesByCenterId(centerId: string): Promise<any> {
    const rules = await this.prisma.rulesEngines.findFirst({
      where: { centerId },
    });

    return rules
      ? {
          id: rules.id,
          name: rules.name,
          description: rules.description,
          enabled: rules.enabled,
          conditions: rules.conditions,
        }
      : null;
  }
}
