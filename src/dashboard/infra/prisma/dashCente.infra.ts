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
import { DashCentrosZodDto } from 'src/dashboard/dtos/dashCentros.dto';
import { DashUmCentrosZodDto } from 'src/dashboard/dtos/dashUmCentro.dto';
import { AnomaliaPorCentroZodDto } from 'src/dashboard/dtos/anomaliaPorCentro.dto';

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
        empresa: dashCenter.empresa,
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

    const dashboard = await this.prisma.dashboardProdutividadeCenter.findFirst({
      where: {
        centerId: params.centerId,
        processo: params.processo as TipoProcesso,
        empresa: params.empresa,
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
          cluster: dashboard.cluster,
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
          empresa: dashboard.empresa,
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

  async dashCentros(
    dataInicio: string,
    dataFim: string,
  ): Promise<DashCentrosZodDto> {
    const { startOfDay: startOfDayInicio } = getStartAndEndOfDay(
      new Date(dataInicio),
    );
    const { endOfDay: endOfDayFim } = getStartAndEndOfDay(new Date(dataFim));

    const [
      result,
      topCincoProdutividadeDiaDia,
      produtividadePorCentro,
      produtividadePorCluster,
    ] = await this.prisma.$transaction(async (tx) => {
      const result = await tx.dashboardProdutividadeCenter.aggregate({
        where: {
          dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
        },
        _sum: {
          totalCaixas: true,
          totalEnderecos: true,
          totalTempoTrabalhado: true,
          totalDemandas: true,
        },
      });
      const topCincoProdutividadeDiaDia =
        await tx.dashboardProdutividadeCenter.findMany({
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
          },
          include: {
            center: true,
          },
        });

      const produtividadePorCentro =
        await tx.dashboardProdutividadeCenter.groupBy({
          by: ['centerId'],
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
          },
          _sum: {
            totalCaixas: true,
            totalTempoTrabalhado: true,
            totalDemandas: true,
          },
        });

      const produtividadePorCluster =
        await tx.dashboardProdutividadeCenter.groupBy({
          by: ['cluster'],
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
          },
          _sum: {
            totalCaixas: true,
            totalTempoTrabalhado: true,
            totalDemandas: true,
          },
        });

      return [
        result,
        topCincoProdutividadeDiaDia,
        produtividadePorCentro,
        produtividadePorCluster,
      ];
    });

    // Calcular Top 5 Produtividade Dia Dia (por centro)
    const acumuladoPorCentro = topCincoProdutividadeDiaDia.reduce(
      (acc, item) => {
        const existente = acc[item.centerId] || {
          centro: item.centerId,
          cluster: item.center.cluster,
          totalCaixas: 0,
          totalTempoTrabalhado: 0,
          produtividade: 0,
        };

        existente.totalCaixas += item.totalCaixas || 0;
        existente.totalTempoTrabalhado += item.totalTempoTrabalhado || 0;

        const horasCentro = existente.totalTempoTrabalhado / 3600000; // ms -> horas
        existente.produtividade =
          horasCentro > 0 ? existente.totalCaixas / horasCentro : 0;

        acc[item.centerId] = existente;
        return acc;
      },
      {} as Record<
        string,
        {
          centro: string;
          cluster: string;
          totalCaixas: number;
          totalTempoTrabalhado: number;
          produtividade: number;
        }
      >,
    );

    const retornoItems = Object.values(acumuladoPorCentro)
      .sort((a, b) => b.produtividade - a.produtividade)
      .slice(0, 5);

    const topCincoProdutividade = retornoItems.map((item) => ({
      centro: item.centro,
      cluster: item.cluster,
      totalCaixas: item.totalCaixas,
      horasTrabalhadas: (item.totalTempoTrabalhado || 0) / 3600000,
      produtividade: item.produtividade,
    }));

    const horas = (result._sum.totalTempoTrabalhado || 0) / 3600000;
    const produtividade = (result._sum.totalCaixas || 0) / (horas || 0) || 0;

    const produtividadeDiaDiaItems = topCincoProdutividadeDiaDia.map((item) => {
      const horasItem = (item.totalTempoTrabalhado || 0) / 3600000;
      return {
        dataRegistro: item.dataRegistro.toISOString(),
        totalCaixas: item.totalCaixas || 0,
        horasTrabalhadas: (item.totalTempoTrabalhado || 0) / 3600000,
        produtividade: horasItem > 0 ? (item.totalCaixas || 0) / horasItem : 0,
      };
    });

    const rankingProdutividadePorCentroItems = produtividadePorCentro.map(
      (item) => {
        const horasItem = (item._sum.totalTempoTrabalhado || 0) / 3600000;
        return {
          totalCaixas: item._sum.totalCaixas || 0,
          horasTrabalhadas: (item._sum.totalTempoTrabalhado || 0) / 3600000,
          cluster: '',
          produtividade:
            horasItem > 0 ? (item._sum.totalCaixas || 0) / horasItem : 0,
          centro: item.centerId,
        };
      },
    );

    const rankingProdutividadePorClusterItems = produtividadePorCluster.map(
      (item) => {
        const horasItem = (item._sum.totalTempoTrabalhado || 0) / 3600000;
        return {
          totalCaixas: item._sum.totalCaixas || 0,
          horasTrabalhadas: (item._sum.totalTempoTrabalhado || 0) / 3600000,
          cluster: item.cluster,
          produtividade:
            horasItem > 0 ? (item._sum.totalCaixas || 0) / horasItem : 0,
        };
      },
    );

    return Promise.resolve({
      totalCaixas: result._sum.totalCaixas || 0,
      horasTrabalhadas: (result._sum.totalTempoTrabalhado || 0) / 3600000,
      totalDemandas: result._sum.totalDemandas || 0,
      produtividade: produtividade,
      topCincoProdutividade: topCincoProdutividade,
      produtividadeDiaDia: produtividadeDiaDiaItems,
      rankingProdutividadePorCentro: rankingProdutividadePorCentroItems,
      rankingProdutividadePorCluster: rankingProdutividadePorClusterItems,
    });
  }

  async dashIndividualCentro(
    dataInicio: string,
    dataFim: string,
    centerId: string,
  ): Promise<DashUmCentrosZodDto> {
    const { startOfDay: startOfDayInicio } = getStartAndEndOfDay(
      new Date(dataInicio),
    );
    const { endOfDay: endOfDayFim } = getStartAndEndOfDay(new Date(dataFim));

    const [
      result,
      topCincoProdutividadeDiaDia,
      topCincoProdutividadeDiaDiaPorCentro,
      produtividadePorTurno,
      produtividadePorEmpresa,
    ] = await this.prisma.$transaction(async (tx) => {
      const result = await tx.dashboardProdutividadeCenter.aggregate({
        where: {
          dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
          centerId: centerId,
        },
        _sum: {
          totalCaixas: true,
          totalEnderecos: true,
          totalTempoTrabalhado: true,
          totalDemandas: true,
        },
      });
      const topCincoProdutividadeDiaDia =
        await tx.dashboardProdutividadeUser.findMany({
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
            centerId: centerId,
          },
          include: {
            center: true,
            funcionario: true,
          },
        });

      const topCincoProdutividadeDiaDiaPorCentro =
        await tx.dashboardProdutividadeCenter.findMany({
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
            centerId: centerId,
          },
          include: {
            center: true,
          },
        });

      const produtividadePorTurno =
        await tx.dashboardProdutividadeCenter.groupBy({
          by: ['turno'],
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
            centerId: centerId,
          },
          _sum: {
            totalCaixas: true,
            totalTempoTrabalhado: true,
            totalDemandas: true,
          },
        });

      const produtividadePorEmpresa =
        await tx.dashboardProdutividadeCenter.groupBy({
          by: ['empresa'],
          where: {
            dataRegistro: { gte: startOfDayInicio, lte: endOfDayFim },
            centerId: centerId,
          },
          _sum: {
            totalCaixas: true,
            totalTempoTrabalhado: true,
            totalDemandas: true,
          },
        });

      return [
        result,
        topCincoProdutividadeDiaDia,
        topCincoProdutividadeDiaDiaPorCentro,
        produtividadePorTurno,
        produtividadePorEmpresa,
      ];
    });

    // Calcular Top 5 Produtividade Dia Dia (por centro)
    const acumuladoPorCentro = topCincoProdutividadeDiaDia.reduce(
      (acc, item) => {
        const existente = acc[item.funcionarioId] || {
          id: item.funcionarioId,
          nome: item.funcionario.name,
          turno: item.turno,
          totalCaixas: 0,
          totalTempoTrabalhado: 0,
          produtividade: 0,
        };

        existente.totalCaixas += item.totalCaixas || 0;
        existente.totalTempoTrabalhado += item.totalTempoTrabalhado || 0;

        const horasCentro = existente.totalTempoTrabalhado / 3600000; // ms -> horas
        existente.produtividade =
          horasCentro > 0 ? existente.totalCaixas / horasCentro : 0;

        acc[item.funcionarioId] = existente;
        return acc;
      },
      {} as Record<
        string,
        {
          id: string;
          nome: string;
          empresa: string;
          turno: string;
          totalCaixas: number;
          totalTempoTrabalhado: number;
          produtividade: number;
        }
      >,
    );

    const retornoItems = Object.values(acumuladoPorCentro)
      .sort((a, b) => b.produtividade - a.produtividade)
      .slice(0, 5);

    const topCincoProdutividade = retornoItems.map((item) => ({
      id: item.id,
      nome: item.nome,
      totalCaixas: item.totalCaixas,
      horasTrabalhadas: (item.totalTempoTrabalhado || 0) / 3600000,
      produtividade: item.produtividade,
    }));

    const retornoItemsPiores = Object.values(acumuladoPorCentro)
      .sort((a, b) => a.produtividade - b.produtividade)
      .slice(0, 5);

    const topCincoPiores = retornoItemsPiores.map((item) => ({
      id: item.id,
      nome: item.nome,
      totalCaixas: item.totalCaixas,
      horasTrabalhadas: (item.totalTempoTrabalhado || 0) / 3600000,
      produtividade: item.produtividade,
    }));

    const horas = (result._sum.totalTempoTrabalhado || 0) / 3600000;
    const produtividade = (result._sum.totalCaixas || 0) / (horas || 0) || 0;

    const produtividadeDiaDiaItems = Object.values(
      topCincoProdutividadeDiaDiaPorCentro.reduce(
        (acc, item) => {
          const data = item.dataRegistro.toISOString().split('T')[0]; // agrupar por data (YYYY-MM-DD)
          const horas = (item.totalTempoTrabalhado || 0) / 3600000;
          const caixas = item.totalCaixas || 0;

          if (!acc[data]) {
            acc[data] = {
              dataRegistro: data,
              totalCaixas: 0,
              horasTrabalhadas: 0,
              produtividade: 0,
            };
          }

          acc[data].totalCaixas += caixas;
          acc[data].horasTrabalhadas += horas;
          acc[data].produtividade =
            acc[data].horasTrabalhadas > 0
              ? acc[data].totalCaixas / acc[data].horasTrabalhadas
              : 0;

          return acc;
        },
        {} as Record<
          string,
          {
            dataRegistro: string;
            totalCaixas: number;
            horasTrabalhadas: number;
            produtividade: number;
          }
        >,
      ),
    );

    const rankingProdutividadePorTurnoItems = produtividadePorTurno.map(
      (item) => {
        const horasItem = (item._sum.totalTempoTrabalhado || 0) / 3600000;
        return {
          totalCaixas: item._sum.totalCaixas || 0,
          turno: item.turno,
          horasTrabalhadas: (item._sum.totalTempoTrabalhado || 0) / 3600000,
          produtividade:
            horasItem > 0 ? (item._sum.totalCaixas || 0) / horasItem : 0,
        };
      },
    );

    const rankingProdutividadePorClusterItems = produtividadePorEmpresa.map(
      (item) => {
        const horasItem = (item._sum.totalTempoTrabalhado || 0) / 3600000;
        return {
          totalCaixas: item._sum.totalCaixas || 0,
          empresa: item.empresa,
          horasTrabalhadas: (item._sum.totalTempoTrabalhado || 0) / 3600000,
          produtividade:
            horasItem > 0 ? (item._sum.totalCaixas || 0) / horasItem : 0,
        };
      },
    );

    return Promise.resolve({
      totalCaixas: result._sum.totalCaixas || 0,
      horasTrabalhadas: (result._sum.totalTempoTrabalhado || 0) / 3600000,
      totalDemandas: result._sum.totalDemandas || 0,
      produtividade: produtividade,
      topCincoProdutividade: topCincoProdutividade,
      topCincoPiores: topCincoPiores,
      produtividadeDiaDia: produtividadeDiaDiaItems,
      rankingProdutividadePorTurno: rankingProdutividadePorTurnoItems,
      rankingProdutividadePorEmpresa: rankingProdutividadePorClusterItems,
    });
  }

  async buscarAnomaliaPorCentro(
    dataInicio: string,
    dataFim: string,
    centerId: string,
  ): Promise<AnomaliaPorCentroZodDto> {
    const { startOfDay: startOfDayInicio } = getStartAndEndOfDay(
      new Date(dataInicio),
    );
    const { endOfDay: endOfDayFim } = getStartAndEndOfDay(new Date(dataFim));
    const resultado = await this.prisma.anomaliaProdutividade.findMany({
      where: {
        fim: { gte: startOfDayInicio, lte: endOfDayFim },
        centerId,
      },
    });

    return resultado.map((item) => {
      return {
        ...item,
        fim: item.fim?.toISOString(),
        inicio: item.inicio?.toISOString(),
      };
    });
  }
}
