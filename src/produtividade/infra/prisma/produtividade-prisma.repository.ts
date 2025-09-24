import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { IProdutividadeRepository } from 'src/produtividade/domain/repositories/IProdutividadeRepository';
import { CreateProdutividadeDto } from 'src/produtividade/dto/create-produtividade.dto';
import {
  StatusDemanda,
  StatusPalete,
} from 'src/produtividade/enums/produtividade.enums';
import { DemandaMapper } from '../mappers/demanda.mapper';
import { BuscarProdutividadeZodDto } from 'src/produtividade/dto/buscarProdutividade.dto';
import {
  OverViewProdutividadeResponseZodDto,
  OverViewProdutividadeZodDto,
} from 'src/produtividade/dto/overViewProdutividade.dto';
import { getStartAndEndOfDay } from 'src/_shared/utils/getStartAndEndOfDay';

@Injectable()
export class ProdutividadePrismaRepository implements IProdutividadeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    produtividade: CreateProdutividadeDto,
    cadastradoPorId: string,
  ): Promise<boolean> {
    await this.prisma.$transaction(async (tx) => {
      const { paletesIds, ...rest } = produtividade;
      const demanda = await tx.demanda.create({
        data: {
          ...rest,
          cadastradoPorId,
        },
      });
      await tx.palete.updateMany({
        where: {
          id: {
            in: paletesIds,
          },
        },
        data: {
          demandaId: demanda.id,
          status: StatusPalete.EM_PROGRESSO,
        },
      });
    });
    return true;
  }

  async buscarProdutividade(
    command: BuscarProdutividadeZodDto,
  ): Promise<DemandaEntity[]> {
    const { centerId, processo } = command;
    const { startOfDay, endOfDay } = getStartAndEndOfDay(
      new Date(command.data),
    );

    const where: any = {
      centerId,
      processo,
      paletes: {
        some: {
          transporte: {
            dataExpedicao: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          // filtros opcionais aplicados dinamicamente
          ...(command.empresa ? { empresa: command.empresa } : {}),
          ...(command.segmento ? { segmento: command.segmento } : {}),
        },
      },
      // filtros opcionais no nível raiz, se houver
      ...(command.status ? { status: command.status } : {}),
    };

    const demandas = await this.prisma.demanda.findMany({
      where,
      include: {
        paletes: {
          include: {
            transporte: true,
          },
        },
        pausas: true,
        funcionario: true,
      },
    });

    return demandas.map((demanda) =>
      DemandaMapper.fromPrismaToEntity({
        ...demanda,
        dataRegistro: demanda.paletes[0].transporte.dataExpedicao.toISOString(),
      }),
    );
  }

  async findByPalletId(palletId: string): Promise<DemandaEntity | null> {
    if (!palletId) {
      return null;
    }
    const demanda = await this.prisma.demanda.findFirst({
      where: {
        paletes: {
          some: {
            id: palletId,
          },
        },
      },
      include: {
        paletes: {
          include: {
            transporte: true,
          },
        },
        pausas: true,
        funcionario: true,
      },
    });
    return demanda
      ? DemandaMapper.fromPrismaToEntity({
          ...demanda,
          dataRegistro:
            demanda.paletes[0].transporte.dataExpedicao.toISOString(),
        })
      : null;
  }

  async deletarDemanda(demandaId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.palete.updateMany({
        where: { demandaId },
        data: {
          status: StatusPalete.NAO_INICIADO,
          demandaId: null,
        },
      });
      await tx.demanda.delete({
        where: { id: demandaId },
      });
    });
  }

  async finalizarDemanda(demanda: DemandaEntity): Promise<void> {
    await this.prisma.demanda.update({
      where: { id: demanda.id },
      data: {
        status: demanda.status,
        fim: demanda.fim,
        obs: demanda.obs,
      },
    });
  }

  async overViewProdutividade(
    command: OverViewProdutividadeZodDto,
  ): Promise<OverViewProdutividadeResponseZodDto> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(
      new Date(command.data),
    );
    return this.prisma.$transaction(async (tx) => {
      const totalProcessos = await tx.demanda.count({
        where: {
          centerId: command.centerId,
          processo: command.processo,
          paletes: {
            some: {
              transporte: {
                dataExpedicao: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              },
            },
          },
        },
      });
      const totalProcessosEmAndamento = await tx.demanda.count({
        where: {
          centerId: command.centerId,
          processo: command.processo,
          status: StatusDemanda.EM_PROGRESSO,
          paletes: {
            some: {
              transporte: {
                dataExpedicao: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              },
            },
          },
        },
      });

      const caixas = await tx.palete.aggregate({
        where: {
          demanda: {
            centerId: command.centerId,
            processo: command.processo,
            paletes: {
              some: {
                transporte: {
                  dataExpedicao: {
                    gte: startOfDay,
                    lte: endOfDay,
                  },
                },
              },
            },
          },
        },
        _sum: {
          quantidadeCaixas: true,
          quantidadeUnidades: true,
          quantidadePaletes: true,
          enderecoVisitado: true,
        },
      });

      const infoProdutividade = await tx.dashboardProdutividadeCenter.aggregate(
        {
          where: {
            centerId: command.centerId,
            processo: command.processo,
            dataRegistro: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          _sum: {
            totalCaixas: true,
            totalUnidades: true,
            totalPaletes: true,
            totalEnderecos: true,
            totalPausasQuantidade: true,
            totalPausasTempo: true,
            totalTempoTrabalhado: true,
            totalDemandas: true,
          },
        },
      );

      return {
        processos: totalProcessos,
        emAndamento: totalProcessosEmAndamento,
        concluidos: totalProcessos - totalProcessosEmAndamento,
        totalCaixas: caixas._sum.quantidadeCaixas || 0,
        totalUnidades: caixas._sum.quantidadeUnidades || 0,
        produtividade:
          (infoProdutividade._sum.totalCaixas || 0) /
            ((infoProdutividade._sum.totalTempoTrabalhado || 0) /
              (1000 * 60 * 60)) || 0,
      };
    });
  }

  async buscarInfoDemanda(demandaId: number): Promise<DemandaEntity | null> {
    const demanda = await this.prisma.demanda.findUnique({
      where: { id: demandaId },
      include: {
        paletes: {
          include: {
            transporte: true,
          },
        },
        pausas: true,
        funcionario: true,
      },
    });
    return demanda
      ? DemandaMapper.fromPrismaToEntity({
          ...demanda,
          dataRegistro:
            demanda.paletes[0].transporte.dataExpedicao.toISOString(),
        })
      : null;
  }
}
