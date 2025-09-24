import { Inject } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';
import { GetInfoDemandaResponseZodDto } from '../dtos/getInfoDemandaResponseZod.dto';

export class GetInfoDemandaUsecase {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number): Promise<GetInfoDemandaResponseZodDto> {
    const demanda = await this.demandaRepository.getDemandaById(demandaId);
    return {
      id: demanda?.id ?? 0,
      placa: demanda?.placa ?? '',
      motorista: demanda?.motorista ?? '',
      transportadora: demanda?.idTransportadora ?? '',
      cargaSegregada: demanda?.cargaSegregada ?? false,
      retornoPalete: demanda?.retornoPalete ?? false,
      quantidadePaletes: demanda?.quantidadePaletes ?? 0,
      status: demanda?.status ?? '',
    };
  }
}
