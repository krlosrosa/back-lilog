import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const DemandaDtoRequestSchema = z.object({
  placa: z.string().length(7, 'Placa deve ter 7 caracteres'),
  idTransportadora: z.string(),
  motorista: z.string(),
  telefone: z.string().optional(),
  cargaSegregada: z.boolean().default(false),
  retornoPalete: z.boolean().default(false),
  quantidadePaletes: z.number().optional().default(0),
});

export class DemandaDtoRequest extends createZodDto(DemandaDtoRequestSchema) {}
