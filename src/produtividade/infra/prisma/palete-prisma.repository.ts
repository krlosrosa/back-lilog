import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { PaleteEntity } from 'src/produtividade/domain/entities/palete.entity';
import { IPaleteRepository } from 'src/produtividade/domain/repositories/IPaleteRepository';
import {
  StatusPalete,
  TipoProcesso,
} from 'src/produtividade/enums/produtividade.enums';

@Injectable()
export class PaletePrismaRepository implements IPaleteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIds(ids: string[]): Promise<PaleteEntity[]> {
    const paletes = await this.prisma.palete.findMany({
      where: {
        id: { in: ids },
      },
    });

    return paletes.map(
      (palete) =>
        new PaleteEntity({
          id: palete.id,
          empresa: palete.empresa,
          segmento: palete.segmento,
          visitas: palete.enderecoVisitado,
          demandaId: palete.demandaId ?? 0,
          status: palete.status as StatusPalete,
          processo: palete.tipoProcesso as TipoProcesso,
          caixas: palete.quantidadeCaixas,
          unidades: palete.quantidadeUnidades,
          paletes: palete.quantidadePaletes,
          criadoEm: palete.criadoEm,
          atualizadoEm: palete.atualizadoEm,
          criadoPorId: palete.criadoPorId,
          validado: palete.validado,
          transporteId: palete.transporteId,
        }),
    );
  }
}
