import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { PausaEntity } from 'src/produtividade/domain/entities/pausa.entity';
import { IPausaRepository } from 'src/produtividade/domain/repositories/iPausaRepository';
import { StatusDemanda } from 'src/produtividade/enums/produtividade.enums';
import { AddPausaGeralInfraDto } from '../dtos/adicionarPausaGeralInfra.dto';
import { PausaGeralEntity } from 'src/produtividade/domain/entities/pausaGeral.entity';
import { PausaGeralMapper } from '../mappers/pausaGeral.mapper';
import { AddPauseGeralDto } from 'src/produtividade/dto/addPauseGeral.dto';

@Injectable()
export class PausaPrismaRepository implements IPausaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async adicionarPausa(pausa: PausaEntity, demandaId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.pausa.create({
        data: {
          demandaId,
          inicio: pausa.inicio,
          fim: pausa.fim,
          motivo: pausa.motivo,
          descricao: pausa.descricao,
          registradoPorId: pausa.registradoPorId,
        },
      });
      await tx.demanda.update({
        where: { id: demandaId },
        data: { status: StatusDemanda.PAUSA },
      });
    });
  }

  async finalizarPausa(pausa: PausaEntity, demandaId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.pausa.update({
        where: { id: pausa.id },
        data: { fim: pausa.fim },
      });
      await tx.demanda.update({
        where: { id: demandaId },
        data: { status: StatusDemanda.EM_PROGRESSO },
      });
    });
  }

  async buscarPausaGeralAtiva(
    params: AddPausaGeralInfraDto,
  ): Promise<PausaGeralEntity | null> {
    const { centerId, turno, processo } = params;
    const pausasGerais = await this.prisma.pausaGeral.findFirst({
      where: {
        centerId,
        turno,
        processo,
        fim: null,
      },
      include: {
        pausas: true,
      },
    });

    return pausasGerais
      ? PausaGeralMapper.fromPrismaToEntity(pausasGerais)
      : null;
  }

  async adicionarPausaGeral(params: AddPauseGeralDto): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const demandas = await tx.demanda.findMany({
        where: {
          centerId: params.centerId,
          turno: params.turno,
          processo: params.processo,
          status: StatusDemanda.EM_PROGRESSO,
          paletes: {
            some: {
              segmento: params.segmento,
            },
          },
        },
      });

      if (demandas.length === 0) {
        return null;
      }

      await tx.pausaGeral.create({
        data: {
          inicio: new Date(),
          processo: params.processo,
          turno: params.turno,
          centerId: params.centerId,
          registradoPorId: params.cadastradoPorId,
          pausas: {
            create: demandas.map((demanda) => ({
              demandaId: demanda.id,
              inicio: new Date(),
              fim: null,
              motivo: params.motivo,
              registradoPorId: params.cadastradoPorId,
            })),
          },
        },
      });
      await tx.demanda.updateMany({
        where: {
          id: { in: demandas.map((demanda) => demanda.id) },
        },
        data: {
          status: StatusDemanda.PAUSA,
        },
      });
    });
  }

  async finalizarPausaGeral(pausaGeralId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const demandas = await tx.demanda.findMany({
        where: {
          pausas: {
            some: {
              pausaGeralId: pausaGeralId,
              fim: null,
            },
          },
        },
      });
      await tx.pausaGeral.update({
        where: { id: pausaGeralId },
        data: { fim: new Date() },
      });
      await tx.pausa.updateMany({
        where: { pausaGeralId },
        data: { fim: new Date() },
      });

      await tx.demanda.updateMany({
        where: {
          id: { in: demandas.map((demanda) => demanda.id) },
        },
        data: {
          status: StatusDemanda.EM_PROGRESSO,
        },
      });
    });
  }
}
