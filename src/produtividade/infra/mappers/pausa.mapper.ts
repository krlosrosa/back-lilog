import { Pausa as PausaPrisma } from '@prisma/client';
import { PausaEntity } from 'src/produtividade/domain/entities/pausa.entity';

export class PausaMapper {
  static fromPrismaToEntity(pausa: PausaPrisma): PausaEntity {
    return PausaEntity.create({
      id: pausa.id,
      inicio: pausa.inicio,
      motivo: pausa.motivo ?? '',
      registradoPorId: pausa.registradoPorId,
      descricao: pausa.descricao ?? undefined,
      fim: pausa.fim ?? undefined,
    });
  }
}
