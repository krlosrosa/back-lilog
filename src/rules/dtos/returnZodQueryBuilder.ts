import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ReturnZodQueryBuilderSchema = z.object({
  combinator: z.string(),
  rules: z.any(),
  field: z.any(),
  operator: z.any(),
  value: z.any(),
});

export class ReturnZodQueryBuilder extends createZodDto(
  ReturnZodQueryBuilderSchema,
) {}
