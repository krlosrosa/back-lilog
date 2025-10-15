import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ruleGroupSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    name: z.string(),
    description: z.string(),
    centerId: z.string(),
    center: z.any().optional(),
    enabled: z.boolean().default(true),
    conditions: z.any(), // Pode refinar isso se quiser validar o formato do JSON (ex: usar o zod anterior)
    createdBy: z.string().nullable().optional(),
  }),
);

export class ListRolesEngine extends createZodDto(ruleGroupSchema) {}
