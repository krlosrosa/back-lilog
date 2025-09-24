import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { getStartAndEndOfDay } from 'src/_shared/utils/getStartAndEndOfDay';
import { StatusPalete } from 'src/produtividade/enums/produtividade.enums';
import { InputPaleteInfraDto } from 'src/transporte/domain/dtos/inputPalete.dto';
import { InputTransportDto } from 'src/transporte/domain/dtos/inputTransport.dto';
import { ITransporteRepository } from 'src/transporte/domain/repositories/ITransporte.repository';
import { TransporteResponseDto } from 'src/transporte/dto/transporte.dto';
import { StatusTransporte } from 'src/transporte/enums/transport.enum';
import { removeDuplicadosPorId } from 'src/utils/removerDuplicadas';

@Injectable()
export class TransportePrismaRepository implements ITransporteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async adicionarTransporte(transporte: InputTransportDto[]): Promise<void> {
    await this.prisma.$transaction(
      async (tx) => {
        await tx.transporte.createMany({
          data: transporte,
        });
      },
      {
        timeout: 100000,
      },
    );
  }

  async adicionarPaletesSeparacao(
    paletes: InputPaleteInfraDto[],
  ): Promise<void> {
    const transporteUnicos = removeDuplicadosPorId(paletes);
    const historicoInput = transporteUnicos.map((item) => ({
      tipoImpressao: item.tipoProcesso,
      impressoPorId: item.criadoPorId,
      impressoEm: new Date(),
      transporteId: item.transporteId,
    }));

    // Agrupar paletes por transporteId
    const paletesPorTransporte = paletes.reduce(
      (acc, palete) => {
        if (!acc[palete.transporteId]) {
          acc[palete.transporteId] = [];
        }
        acc[palete.transporteId].push(palete);
        return acc;
      },
      {} as Record<string, InputPaleteInfraDto[]>,
    );

    // Pegar todos os IDs únicos de transporte
    const transporteIds = Object.keys(paletesPorTransporte);

    await this.prisma.$transaction(
      async (tx) => {
        // 1. Excluir paletes existentes para todos os transportes
        await tx.palete.deleteMany({
          where: {
            tipoProcesso: paletes[0].tipoProcesso,
            transporteId: {
              in: transporteIds,
            },
          },
        });
        await tx.palete.createMany({
          data: paletes,
        });
        await tx.historicoImpressaoMapa.createMany({
          data: historicoInput,
        });
      },
      {
        timeout: 100000,
      },
    );
  }

  async listarTransportes(ids: string[]): Promise<string[]> {
    const transportes = await this.prisma.transporte.findMany({
      where: {
        numeroTransporte: { in: ids },
      },
    });

    return transportes.map((transporte) => transporte.numeroTransporte);
  }

  async getTransportesByIds(ids: string[]): Promise<TransporteResponseDto[]> {
    const idArray = Array.isArray(ids) ? ids : [ids]; // Garante que é sempre um array
    const transportes = await this.prisma.transporte.findMany({
      where: {
        numeroTransporte: { in: idArray },
      },
      include: {
        historicoImpressaoMapa: true,
      },
    });

    return transportes.map((transporte) => ({
      numeroTransporte: transporte.numeroTransporte,
      status: transporte.status as StatusTransporte,
      nomeRota: transporte.nomeRota,
      nomeTransportadora: transporte.nomeTransportadora,
      placa: transporte.placa,
      cadastradoPorId: transporte.cadastradoPorId,
      prioridade: transporte.prioridade,
      obs: transporte.obs ?? '',
      qtdImpressaoCarregamento: transporte.historicoImpressaoMapa.filter(
        (item) => item.tipoImpressao === 'CARREGAMENTO',
      ).length,
      qtdImpressaoSeparacao: transporte.historicoImpressaoMapa.filter(
        (item) => item.tipoImpressao === 'SEPARACAO',
      ).length,
    }));
  }

  async listarTransportesComDemandaIniciada(ids: string[]): Promise<string[]> {
    const idArray = Array.isArray(ids) ? ids : [ids]; // Garante que é sempre um array
    const transportes = await this.prisma.transporte.findMany({
      where: {
        numeroTransporte: { in: idArray },
        paletes: {
          some: {
            status: {
              not: StatusPalete.NAO_INICIADO,
            },
          },
        },
      },
      include: {
        historicoImpressaoMapa: true,
      },
    });

    const transportesIds = transportes.map(
      (transporte) => transporte.numeroTransporte,
    );
    return transportesIds;
  }

  async buscarTransportePorData(
    data: string,
  ): Promise<TransporteResponseDto[]> {
    const dataFormatada = new Date(data);
    const { startOfDay, endOfDay } = getStartAndEndOfDay(dataFormatada);
    const transportes = await this.prisma.transporte.findMany({
      where: {
        dataExpedicao: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        historicoImpressaoMapa: true,
        cortesMercadoria: true,
      },
    });

    return transportes.map((transporte) => ({
      numeroTransporte: transporte.numeroTransporte,
      status: transporte.status as StatusTransporte,
      nomeRota: transporte.nomeRota,
      nomeTransportadora: transporte.nomeTransportadora,
      placa: transporte.placa,
      cadastradoPorId: transporte.cadastradoPorId,
      prioridade: transporte.prioridade,
      obs: transporte.obs ?? '',
      temCortes: transporte.cortesMercadoria.length > 0,
      qtdImpressaoCarregamento: transporte.historicoImpressaoMapa.filter(
        (item) => item.tipoImpressao === 'CARREGAMENTO',
      ).length,
      qtdImpressaoSeparacao: transporte.historicoImpressaoMapa.filter(
        (item) => item.tipoImpressao === 'SEPARACAO',
      ).length,
    }));
  }
}
