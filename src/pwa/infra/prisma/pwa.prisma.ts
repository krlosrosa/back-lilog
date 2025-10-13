import { Injectable } from '@nestjs/common';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { ContabilByIdResponseZodDto } from 'src/devolucao/demanda/dtos/contabilByIdResponseZod.dto';
import { PwaItensEntity } from 'src/pwa/domain/entities/pwaItens.entity';
import { PwaNotasEntity } from 'src/pwa/domain/entities/pwaNotas.entity';
import { IPwaRepository } from 'src/pwa/domain/repository/IPwa.repository';
import { FinalizarDemandaDevolucaoZodDto } from 'src/pwa/dtos/finalizarDemandaDevolucao.dto';
import { ListaDemandasZodDto } from 'src/pwa/dtos/listaDemandas.dto';
import { SalvarImagensBancoZodDto } from 'src/pwa/dtos/salvarImagensBanco.dto';

@Injectable()
export class PwaPrismaRepository implements IPwaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async iniciarConferenciaDemanda(
    demandaId: number,
    horaInicio: string,
    doca: string,
    conferenteId: string,
  ): Promise<PwaNotasEntity[]> {
    const demanda = await this.prisma.$transaction(async (tx) => {
      await tx.devolucaoDemanda.update({
        where: { id: demandaId },
        data: {
          status: StatusDevolucao.EM_CONFERENCIA,
          doca,
          conferenteId,
          inicioConferenciaEm: horaInicio,
        },
      });
      const demanda = await tx.devolucaoNotas.findMany({
        where: { id: demandaId },
        include: {
          devolucaoDemanda: {
            include: {
              devolucaoItens: true,
            },
          },
        },
      });
      return demanda;
    });
    return demanda.map((item) =>
      PwaNotasEntity.fromPrimitives({
        ...item,
        tipo: item.tipo as TipoDevolucaoNotas,
        pwaItens: item.devolucaoDemanda.devolucaoItens.map((itemItens) =>
          PwaItensEntity.fromPrimitives({
            ...itemItens,
          }),
        ),
      }),
    );
  }

  async buscarTodasDemandasPorCentroEStatus(
    centerId: string,
    conferenteId: string,
  ): Promise<ListaDemandasZodDto> {
    const demandas = await this.prisma.devolucaoDemanda.findMany({
      where: {
        centerId,
        OR: [
          { status: StatusDevolucao.AGUARDANDO_CONFERENCIA },
          {
            AND: [{ status: StatusDevolucao.EM_CONFERENCIA }, { conferenteId }],
          },
        ],
      },
    });
    return demandas.map((item) => ({
      id: item.id,
      placa: item.placa,
      motorista: item.motorista,
      doca: item.doca ?? '',
      conferenteId: item.conferenteId ?? '',
      data: item.criadoEm.toISOString(),
      status: item.status as StatusDevolucao,
      transportadora: item.idTransportadora ?? '',
      cargaSegregada: item.cargaSegregada,
      retornoPalete: item.retornoPalete,
      quantidadePaletes: item.quantidadePaletes ?? 0,
    }));
  }
  async getContabilById(
    demandaId: number,
  ): Promise<ContabilByIdResponseZodDto | null> {
    const notas = await this.prisma.devolucaoNotas.findMany({
      where: {
        devolucaoDemandaId: demandaId,
      },
    });
    const data = await this.prisma.devolucaoItens.findMany({
      where: {
        demandaId: demandaId,
      },
    });

    const resultadoFinal = data.map((item) => {
      const tipo = notas.find((nf) => nf.notaFiscal === item.devolucaoNotasId);
      return {
        tipo: tipo?.tipo ?? '',
        id: item.id,
        sku: item.sku,
        descricao: item.descricao,
        quantidadeCaixas: item.quantidadeCaixas ?? 0,
        quantidadeUnidades: item.quantidadeUnidades ?? 0,
      };
    });

    return {
      demandaId: demandaId,
      devolucaoItens: resultadoFinal,
    };
  }

  async salvarImagensBanco(command: SalvarImagensBancoZodDto[]): Promise<void> {
    await this.prisma.devolucaImagens.createMany({
      data: command.map((item) => ({
        demandaId: Number(item.demandaId),
        processo: item.processo,
        tag: item.tag,
      })),
    });
  }

  async finalizarDemanda(
    demandaId: string,
    request: FinalizarDemandaDevolucaoZodDto,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.devolucaoCheckList.create({
        data: {
          temperaturaBau: request.checkList.temperaturaCaminhao ?? 0,
          temperaturaProduto: request.checkList.temperaturaProduto ?? 0,
          demandaId: Number(demandaId),
          anomalias: request.checkList.anomalias,
        },
      });
      await tx.devolucaoDemanda.update({
        where: { id: Number(demandaId) },
        data: {
          status: StatusDevolucao.CONFERENCIA_FINALIZADA,
          finalizadoEm: new Date(),
        },
      });
      await tx.devolucaoItens.createMany({
        data: request.conferenciaFisica.map((item) => ({
          quantidadeCaixas: item.quantidadeCaixas,
          quantidadeUnidades: item.quantidadeUnidades,
          tipo: 'FISICO',
          demandaId: Number(demandaId),
          sku: item.sku,
          descricao: item.descricao,
        })),
      });
    });
  }
}
