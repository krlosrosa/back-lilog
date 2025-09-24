// src/common/dtos/error.dtos.ts

import { createZodDto } from 'nestjs-zod';
import {
  error400Schema,
  error401Schema,
  error403Schema,
  error404Schema,
  error500Schema,
} from '../schemas/error.schemas';

// Usamos 'extends createZodDto()' para criar as classes
export class Error400Dto extends createZodDto(error400Schema) {}
export class Error401Dto extends createZodDto(error401Schema) {}
export class Error403Dto extends createZodDto(error403Schema) {}
export class Error404Dto extends createZodDto(error404Schema) {}
export class Error500Dto extends createZodDto(error500Schema) {}
