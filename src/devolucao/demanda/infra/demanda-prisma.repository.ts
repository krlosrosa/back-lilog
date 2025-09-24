import { Injectable } from '@nestjs/common';
import { IDemandaRepository } from '../domain/repositories/demanda.repository';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { getStartAndEndOfDay } from 'src/_shared/utils/getStartAndEndOfDay';
import { DemandaDevolucaoDtoResponse } from '../dtos/demandaDevoluca.dto';
import { ReturnInfoGeralRavex } from '../dtos/ravex/returnInfoGeralRavex';
import { gerarSenhaQuatroDigitos } from 'src/_shared/utils/gerarSenhaQuatroDigitos';
import { Empresa } from 'src/_shared/enums/empresa.enum';
import { AddItensEmDemandaDto } from '../dtos/ravex/addItensEmDemanda.dto';
import { DevolucaoDemandaEntity } from '../domain/entities/demandaDevolucao.entity';
import { DevolucaoNotasEntity } from '../domain/entities/devolucaoNotas.entity';
import { DevolucaoItensEntity } from '../domain/entities/devolucaoItens.entity';
import { DevolucaoCheckListEntity } from '../domain/entities/devolucaCheckList.entity';

@Injectable()
export class DemandaPrismaRepository implements IDemandaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async liberarDemandaArmazem(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.devolucaoDemanda.update({
        where: { id: demandaId },
        data: {
          status: StatusDevolucao.AGUARDANDO_CONFERENCIA,
          liberadoParaConferenciaEm: new Date(),
        },
      });
      await tx.devolucaoHistoricoStatus.create({
        data: {
          responsavelId: responsavelId,
          devolucaoDemandaId: demandaId,
          status: StatusDevolucao.AGUARDANDO_CONFERENCIA,
        },
      });
    });
  }

  async listarDemandasPorData(
    data: string,
    centroId: string,
  ): Promise<DemandaDevolucaoDtoResponse> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date(data));
    console.log(startOfDay, endOfDay);
    const demandas = await this.prisma.devolucaoDemanda.findMany({
      where: {
        centerId: centroId,
        criadoEm: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return demandas.map((demanda) => ({
      ...demanda,
      id: demanda.id,
      placa: demanda.placa,
      motorista: demanda.motorista,
      idTransportadora: demanda.idTransportadora ?? '',
      transportadora: demanda.idTransportadora ?? '',
      telefone: demanda.telefone ?? '',
      cargaSegregada: demanda.cargaSegregada,
      retornoPalete: demanda.retornoPalete,
      quantidadePaletes: demanda.quantidadePaletes ?? 0,
      centerId: demanda.centerId,
      adicionadoPorId: demanda.adicionadoPorId,
      conferenteId: demanda.conferenteId ?? '',
      criadoEm: demanda.criadoEm,
      atualizadoEm: demanda.atualizadoEm,
      status: demanda.status as StatusDevolucao,
      fechouComAnomalia: demanda.fechouComAnomalia ?? false,
      liberadoParaConferenciaEm:
        demanda.liberadoParaConferenciaEm ?? new Date(),
      inicioConferenciaEm: demanda.inicioConferenciaEm ?? new Date(),
      fimConferenciaEm: demanda.fimConferenciaEm ?? new Date(),
      finalizadoEm: demanda.finalizadoEm ?? new Date(),
      senha: demanda.senha,
    }));
  }

  async addDemandaViaRavex(
    demandaRavex: ReturnInfoGeralRavex,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<number> {
    const { notas, ...rest } = demandaRavex;

    const demanda = await this.prisma.devolucaoDemanda.create({
      data: {
        motorista: rest.motorista,
        placa: rest.placa,
        idTransportadora: rest.transportadora,
        centerId: centerId,
        senha: gerarSenhaQuatroDigitos(),
        adicionadoPorId,
        devolucaoItens: {
          createMany: {
            data: notas.flatMap((nota) =>
              nota.itens.map((item) => ({
                sku: item.sku,
                descricao: item.descricao,
                quantidadeCaixas: item.quantidadeCaixas,
                quantidadeUnidades: item.quantidadeUnidades,
                tipo: 'CONTABIL',
                devolucaoNotasId: nota.notaFiscal,
              })),
            ),
          },
        },
        devolucaoNotas: {
          createMany: {
            data: notas.map((nota) => ({
              notaFiscal: nota.notaFiscal,
              motivoDevolucao: nota.motivoDevolucao,
              descMotivoDevolucao: nota.descMotivoDevolucao,
              nfParcial: nota.notaFiscalParcial,
              idViagemRavex: rest.idViagem,
              empresa: Empresa.LDB,
            })),
          },
        },
      },
    });
    return demanda.id;
  }

  async adicionarItensEmDemandaViaRavex(
    demandaId: number,
    centerId: string,
    adicionadoPorId: string,
    itens: AddItensEmDemandaDto,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const item of itens) {
        await tx.devolucaoNotas.create({
          data: {
            empresa: Empresa.LDB,
            devolucaoDemandaId: demandaId,
            notaFiscal: item.notaFiscal,
            motivoDevolucao: item.motivoDevolucao,
            descMotivoDevolucao: item.descMotivoDevolucao,
            nfParcial: item.notaFiscalParcial,
            idViagemRavex: item.idViagemRavex,
            tipo: item.tipo,
          },
        });
        await tx.devolucaoItens.createMany({
          data: item.itens.map((itemItens) => ({
            sku: itemItens.sku,
            descricao: itemItens.descricao,
            quantidadeCaixas: itemItens.quantidadeCaixas,
            quantidadeUnidades: itemItens.quantidadeUnidades,
            tipo: 'CONTABIL',
            devolucaoNotasId: item.notaFiscal,
            demandaId: demandaId,
          })),
        });
      }
    });
  }

  async reabrirDemanda(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    await this.prisma.devolucaoDemanda.update({
      where: { id: demandaId },
      data: {
        status: StatusDevolucao.EM_CONFERENCIA,
        historicoStatus: {
          create: {
            status: StatusDevolucao.EM_CONFERENCIA,
            responsavelId: responsavelId,
          },
        },
      },
    });
  }

  async deletarDemanda(demandaId: number): Promise<void> {
    await this.prisma.devolucaoDemanda.delete({
      where: { id: demandaId },
    });
  }

  async finalizarDemanda(
    demandaId: number,
    responsavelId: string,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.devolucaoDemanda.update({
        where: { id: demandaId },
        data: {
          status: StatusDevolucao.FINALIZADO,
          finalizadoEm: new Date(),
          historicoStatus: {
            create: {
              status: StatusDevolucao.FINALIZADO,
              responsavelId: responsavelId,
            },
          },
        },
      });
    });
  }

  async getDemandaById(
    demandaId: number,
  ): Promise<DevolucaoDemandaEntity | null> {
    const demanda = await this.prisma.devolucaoDemanda.findUnique({
      where: { id: demandaId },
      include: {
        devolucaoNotas: true,
        devolucaoItens: true,
        adicionadoPor: true,
        conferente: true,
        devolucaoCheckList: true,
      },
    });
    return demanda
      ? DevolucaoDemandaEntity.fromPrimitives({
          ...demanda,
          adicionadoPorId: demanda.adicionadoPor.name,
          conferenteId: demanda.conferente?.name ?? '',
          devolucaoNotas: demanda.devolucaoNotas.map((nota) =>
            DevolucaoNotasEntity.fromPrimitives(nota),
          ),
          devolucaoItens: demanda.devolucaoItens.map((item) =>
            DevolucaoItensEntity.fromPrimitives({
              ...item,
            }),
          ),
          devolucaoCheckList: demanda.devolucaoCheckList
            ? DevolucaoCheckListEntity.fromPrimitives(
                demanda.devolucaoCheckList,
              )
            : null,
        })
      : null;
  }
}
