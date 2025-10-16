import { z } from 'zod';

const updateTransporte = z.object({
  demanda: z.number(), // ou z.string(), z.number(), dependendo do tipo de `demanda`
  processo: z.string(), // supondo que `command.processo` seja uma string
  cadastrado: z.string(), // supondo que `command.cadastradoPorId` seja uma string (ID)
});

export type UpdateTransporteDto = z.infer<typeof updateTransporte>;
