import { Injectable } from '@nestjs/common';
import { IDashboardRepositoryUser } from 'src/dashboard/domain/repository/IDashboardRepositoryUser.repository';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { AtualizarDashBoardUserZodDto } from 'src/dashboard/dtos/atualizarDashBoardUser.dto';
import { DashUserEntity } from 'src/dashboard/domain/entities/dashUser.entity';
import { TipoProcesso, Turno } from '@prisma/client';
import { getStartAndEndOfDay } from 'src/_shared/utils/getStartAndEndOfDay';
import {
  TipoProcesso as TipoProcessoPrisma,
  Turno as TurnoProdutividade,
} from 'src/produtividade/enums/produtividade.enums';

@Injectable()
export class DashUserPrismaRepository implements IDashboardRepositoryUser {
  constructor(private readonly prisma: PrismaService) {}

  async atualizarDashBoardUser(dashUser: DashUserEntity): Promise<void> {
    await this.prisma.dashboardProdutividadeUser.upsert({
      where: {
        funcionarioId_centerId_processo_dataRegistro_turno: {
          funcionarioId: dashUser.funcionarioId,
          centerId: dashUser.centerId,
          processo: dashUser.processo as TipoProcesso,
          dataRegistro: new Date(dashUser.dataRegistro),
          turno: dashUser.turno as Turno,
        },
      },
      create: {
        centerId: dashUser.centerId,
        funcionarioId: dashUser.funcionarioId,
        processo: dashUser.processo as TipoProcesso,
        dataRegistro: new Date(dashUser.dataRegistro),
        turno: dashUser.turno as Turno,
        totalCaixas: dashUser.totalCaixas,
        totalUnidades: dashUser.totalUnidades,
        totalPaletes: dashUser.totalPaletes,
        totalEnderecos: dashUser.totalEnderecos,
        totalPausasQuantidade: dashUser.totalPausasQuantidade,
        totalPausasTempo: dashUser.totalPausasTempo,
        totalTempoTrabalhado: dashUser.totalTempoTrabalhado,
        totalDemandas: dashUser.totalDemandas,
      },
      update: {
        totalCaixas: dashUser.totalCaixas,
        totalUnidades: dashUser.totalUnidades,
        totalPaletes: dashUser.totalPaletes,
        totalEnderecos: dashUser.totalEnderecos,
        totalPausasQuantidade: dashUser.totalPausasQuantidade,
        totalPausasTempo: dashUser.totalPausasTempo,
        totalTempoTrabalhado: dashUser.totalTempoTrabalhado,
        totalDemandas: dashUser.totalDemandas,
      },
    });
  }

  async buscarProdutibidadeAtualUser(
    params: AtualizarDashBoardUserZodDto,
  ): Promise<DashUserEntity | null> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(
      new Date(params.dataRegistro),
    );
    const dashboard = await this.prisma.dashboardProdutividadeUser.findFirst({
      where: {
        funcionarioId: params.funcionarioId,
        processo: params.processo as TipoProcesso,
        dataRegistro: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return dashboard
      ? DashUserEntity.create({
          id: dashboard.id,
          dataRegistro: dashboard.dataRegistro.toISOString(),
          centerId: dashboard.centerId,
          funcionarioId: dashboard.funcionarioId,
          totalCaixas: dashboard.totalCaixas,
          totalUnidades: dashboard.totalUnidades,
          totalPaletes: dashboard.totalPaletes,
          totalEnderecos: dashboard.totalEnderecos,
          totalPausasQuantidade: dashboard.totalPausasQuantidade,
          totalPausasTempo: dashboard.totalPausasTempo,
          totalTempoTrabalhado: dashboard.totalTempoTrabalhado,
          totalDemandas: dashboard.totalDemandas,
          processo: dashboard.processo as TipoProcessoPrisma,
          turno: dashboard.turno as TurnoProdutividade,
        })
      : null;
  }
}
