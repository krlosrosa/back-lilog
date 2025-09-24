import { PausaGeralEntity } from 'src/produtividade/domain/entities/pausaGeral.entity';
import { PausaGeral as PausaGeralPrisma } from '@prisma/client';
import {
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';
import { Pausa as PausaPrisma } from '@prisma/client';
import { PausaMapper } from './pausa.mapper';

type PrismaPausaGeralWithPausas = PausaGeralPrisma & {
  pausas: PausaPrisma[];
};

export class PausaGeralMapper {
  static fromPrismaToEntity(
    pausaGeral: PrismaPausaGeralWithPausas,
  ): PausaGeralEntity {
    return new PausaGeralEntity({
      id: pausaGeral.id,
      inicio: pausaGeral.inicio,
      fim: pausaGeral.fim ?? null,
      motivo: pausaGeral.motivo ?? null,
      centerId: pausaGeral.centerId,
      processo: pausaGeral.processo as TipoProcesso,
      turno: pausaGeral.turno as Turno,
      registradoPorId: pausaGeral.registradoPorId,
      pausas: pausaGeral.pausas?.map((pausa) =>
        PausaMapper.fromPrismaToEntity(pausa),
      ),
    });
  }
}
