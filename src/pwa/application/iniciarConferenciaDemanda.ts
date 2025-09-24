import { Inject, Injectable } from '@nestjs/common';
import { type IPwaRepository } from '../domain/repository/IPwa.repository';
import { ResponseStartDemandaZodDto } from '../dtos/responseStartDemanda.dto';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';

@Injectable()
export class IniciarConferenciaDemandaUsecase {
  constructor(
    @Inject('IPwaRepository')
    private readonly pwaRepository: IPwaRepository,
  ) {}

  async execute(
    demandaId: number,
    horaInicio: string,
    doca: string,
    conferenteId: string,
  ): Promise<ResponseStartDemandaZodDto> {
    const demandas = await this.pwaRepository.iniciarConferenciaDemanda(
      demandaId,
      horaInicio,
      doca,
      conferenteId,
    );

    const reentrega = demandas
      .filter((item) => item.tipo === TipoDevolucaoNotas.REENTREGA)
      .map((item) => item.itens)
      .flat();
    const devolucao = demandas
      .filter((item) => item.tipo !== TipoDevolucaoNotas.DEVOLUCAO)
      .map((item) => item.itens)
      .flat();

    return {
      devolucaoItens:
        devolucao.map((item) => ({
          id: item.id,
          sku: item.sku,
          descricao: item.descricao,
          quantidadeCaixas: item.quantidadeCaixas || 0,
          quantidadeUnidades: item.quantidadeUnidades || 0,
          tipo: item.tipo,
        })) || [],
      reentregaItens:
        reentrega.map((item) => ({
          id: item.id,
          sku: item.sku,
          descricao: item.descricao,
          quantidadeCaixas: item.quantidadeCaixas || 0,
          quantidadeUnidades: item.quantidadeUnidades || 0,
          tipo: item.tipo,
        })) || [],
    };
  }
}

/**
 * 
id: z.number(),
sku: z.string(),
descricao: z.string(),
quantidadeCaixas: z.number().nullable(),
quantidadeUnidades: z.number().nullable(),
tipo: z.string(),
*/
