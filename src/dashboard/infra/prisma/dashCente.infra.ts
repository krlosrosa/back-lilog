import { Injectable } from '@nestjs/common';
import { IDashboardRepositoryCenter } from 'src/dashboard/domain/repository/IDashboardRepositoryCenter.repository';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { AtualizarDashBoardCentroZodDto } from 'src/dashboard/dtos/atualizarDashBoard.dto';
import { DashCenterEntity } from 'src/dashboard/domain/entities/dashCenter.entity';
import { TipoProcesso, Turno } from '@prisma/client';
import { getStartAndEndOfDay } from 'src/_shared/utils/getStartAndEndOfDay';
import {
  TipoProcesso as TipoProcessoPrisma,
  Turno as TurnoProdutividade,
} from 'src/produtividade/enums/produtividade.enums';
import { StatusTransporte } from 'src/transporte/enums/transport.enum';
import { StatusPorTransporteZodDto } from 'src/dashboard/dtos/statusPorTransporte.dto';

@Injectable()
export class DashCenterPrismaRepository implements IDashboardRepositoryCenter {
  constructor(private readonly prisma: PrismaService) {}

  async atualizarDashBoardCentro(dashCenter: DashCenterEntity): Promise<void> {
    await this.prisma.dashboardProdutividadeCenter.upsert({
      where: {
        centerId_processo_dataRegistro_turno: {
          centerId: dashCenter.centerId,
          processo: dashCenter.processo as TipoProcesso,
          dataRegistro: dashCenter.dataRegistro,
          turno: dashCenter.turno as Turno,
        },
      },
      create: {
        centerId: dashCenter.centerId,
        processo: dashCenter.processo as TipoProcesso,
        dataRegistro: new Date(dashCenter.dataRegistro),
        turno: dashCenter.turno as Turno,
        totalCaixas: dashCenter.totalCaixas,
        totalUnidades: dashCenter.totalUnidades,
        totalPaletes: dashCenter.totalPaletes,
        totalEnderecos: dashCenter.totalEnderecos,
        totalPausasQuantidade: dashCenter.totalPausasQuantidade,
        totalPausasTempo: dashCenter.totalPausasTempo,
        totalTempoTrabalhado: dashCenter.totalTempoTrabalhado,
        totalDemandas: dashCenter.totalDemandas,
      },
      update: {
        totalCaixas: dashCenter.totalCaixas,
        totalUnidades: dashCenter.totalUnidades,
        totalPaletes: dashCenter.totalPaletes,
        totalEnderecos: dashCenter.totalEnderecos,
        totalPausasQuantidade: dashCenter.totalPausasQuantidade,
        totalPausasTempo: dashCenter.totalPausasTempo,
        totalTempoTrabalhado: dashCenter.totalTempoTrabalhado,
        totalDemandas: dashCenter.totalDemandas,
      },
    });
  }

  async buscarProdutibidadeAtualCentro(
    params: AtualizarDashBoardCentroZodDto,
  ): Promise<DashCenterEntity | null> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(
      new Date(params.dataRegistro),
    );
    console.log({ startOfDay, endOfDay });
    const dashboard = await this.prisma.dashboardProdutividadeCenter.findFirst({
      where: {
        centerId: params.centerId,
        processo: params.processo as TipoProcesso,
        dataRegistro: {
          gte: startOfDay,
          lte: endOfDay,
        },
        turno: params.turno as Turno,
      },
    });

    return dashboard
      ? DashCenterEntity.create({
          id: dashboard.id,
          dataRegistro: dashboard.dataRegistro.toISOString(),
          centerId: dashboard.centerId,
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

  async statusPorTransporte(
    data: string,
    centerId: string,
  ): Promise<StatusPorTransporteZodDto> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date(data));
    const statusPorTransporte = await this.prisma.transporte.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
      where: {
        centerId,
        dataExpedicao: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return {
      naoIniciado:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.AGUARDANDO_SEPARACAO,
        )?._count._all || 0,
      emSeparacao:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.EM_SEPARACAO,
        )?._count._all || 0,
      emConferencia:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.EM_CONFERENCIA,
        )?._count._all || 0,
      emCarregamento:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.EM_CARREGAMENTO,
        )?._count._all || 0,
      carregamentoConcluido:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.CARREGAMENTO_CONCLUIDO,
        )?._count._all || 0,
      faturado:
        statusPorTransporte.find(
          (status) => status.status === StatusTransporte.FATURADO,
        )?._count._all || 0,
    };
  }
}
