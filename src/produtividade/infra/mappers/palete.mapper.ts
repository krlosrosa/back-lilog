import { PaleteEntity } from 'src/produtividade/domain/entities/palete.entity';
import { Palete as PaletePrisma } from '@prisma/client';
import {
  StatusPalete,
  TipoProcesso,
} from 'src/produtividade/enums/produtividade.enums';

export class PaleteMapper {
  static fromPrismaToEntity(palete: PaletePrisma): PaleteEntity {
    return PaleteEntity.create({
      id: palete.id.toString(),
      demandaId: palete.demandaId ?? 0,
      status: palete.status as StatusPalete,
      processo: palete.tipoProcesso as TipoProcesso,
      caixas: palete.quantidadeCaixas,
      unidades: palete.quantidadeUnidades,
      paletes: palete.quantidadePaletes,
      empresa: palete.empresa,
      segmento: palete.segmento,
      visitas: palete.enderecoVisitado,
      criadoEm: palete.criadoEm,
      atualizadoEm: palete.atualizadoEm,
      criadoPorId: palete.criadoPorId,
      validado: palete.validado,
      transporteId: palete.transporteId,
    });
  }
}
