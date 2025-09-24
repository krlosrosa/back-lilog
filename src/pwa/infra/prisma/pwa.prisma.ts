import { Injectable } from '@nestjs/common';
import { StatusDevolucao } from 'src/_shared/enums/statusDevolucao.enum';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { PwaItensEntity } from 'src/pwa/domain/entities/pwaItens.entity';
import { PwaNotasEntity } from 'src/pwa/domain/entities/pwaNotas.entity';
import { IPwaRepository } from 'src/pwa/domain/repository/IPwa.repository';
import { ListaDemandasZodDto } from 'src/pwa/dtos/listaDemandas.dto';

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
}
