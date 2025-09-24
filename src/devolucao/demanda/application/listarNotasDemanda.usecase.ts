import { Inject, Injectable } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';
import { ListarNotasDemandaResponseZodDto } from '../dtos/ListarNotasDemandaResponseZod.dto';
import { TipoDevolucaoNotas } from 'src/_shared/enums/tipoDevolucao.enum';

@Injectable()
export class ListarNotasDemandaUsecase {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number): Promise<ListarNotasDemandaResponseZodDto> {
    const demanda = await this.demandaRepository.getDemandaById(demandaId);
    return {
      adicionadoPorId: demanda?.adicionadoPorId ?? '',
      placa: demanda?.placa ?? '',
      motorista: demanda?.motorista ?? '',
      transportadora: demanda?.idTransportadora ?? '',
      cargaSegregada: demanda?.cargaSegregada ?? false,
      retornoPalete: demanda?.retornoPalete ?? false,
      quantidadePaletes: demanda?.quantidadePaletes ?? 0,
      centerId: demanda?.centerId ?? '',
      criadoEm: demanda?.criadoEm.toISOString() ?? new Date().toISOString(),
      status: demanda?.status ?? '',
      notas:
        demanda?.devolucaoNotas?.map((nota) => ({
          id: nota.id,
          viagemId: nota.idViagemRavex ?? '',
          empresa: nota.empresa,
          devolucaoDemandaId: nota.devolucaoDemandaId,
          notaFiscal: nota.notaFiscal,
          motivoDevolucao: nota.motivoDevolucao,
          descMotivoDevolucao: nota.descMotivoDevolucao ?? null,
          nfParcial: nota.nfParcial ?? null,
          criadoEm: nota.criadoEm.toISOString() ?? new Date().toISOString(),
          tipo: nota.tipo as TipoDevolucaoNotas,
        })) ?? [],
    };
  }
}
