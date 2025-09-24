import {
  Demanda as DemandaPrisma,
  Pausa as PausaPrisma,
  Palete as PaletePrisma,
  User as UserPrisma,
} from '@prisma/client';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import {
  StatusDemanda,
  TipoProcesso,
  Turno,
} from 'src/produtividade/enums/produtividade.enums';
import { PausaMapper } from './pausa.mapper';
import { PaleteMapper } from './palete.mapper';

type PrismaDemandaWithPausas = DemandaPrisma & {
  pausas: PausaPrisma[];
  paletes: PaletePrisma[];
  funcionario: UserPrisma;
  dataRegistro: string;
};

export class DemandaMapper {
  static fromPrismaToEntity(demanda: PrismaDemandaWithPausas): DemandaEntity {
    return DemandaEntity.create({
      pausas: demanda.pausas.map((pausa) =>
        PausaMapper.fromPrismaToEntity(pausa),
      ),
      paletes: demanda.paletes.map((palete) =>
        PaleteMapper.fromPrismaToEntity(palete),
      ),
      id: demanda.id,
      status: demanda.status as StatusDemanda,
      processo: demanda.processo as TipoProcesso,
      inicio: demanda.inicio,
      fim: demanda.fim ?? null,
      cadastradoPorId: demanda.cadastradoPorId,
      turno: demanda.turno as Turno,
      funcionarioId: demanda.funcionarioId,
      centerId: demanda.centerId,
      funcionario: demanda.funcionario.name,
      criadoEm: demanda.criadoEm,
      dataRegistro: demanda.dataRegistro,
    });
  }
}
