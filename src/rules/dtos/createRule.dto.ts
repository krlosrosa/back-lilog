import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RuleInputZod = z.object({
  name: z.string(),
  description: z.string(),
  centerId: z.string(),
  enabled: z.boolean().default(true),
  conditions: z.any(),
  createdBy: z.string(),
});

export class CreateRuleDto extends createZodDto(RuleInputZod) {}
