import { type IDemandaRepository } from '../domain/repositories/demanda.repository';
import { Inject } from '@nestjs/common';
import { DemandaDevolucaoDtoResponse } from '../dtos/demandaDevoluca.dto';

export class ListarDemandasPorData {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(
    data: string,
    centroId: string,
  ): Promise<DemandaDevolucaoDtoResponse> {
    return this.demandaRepository.listarDemandasPorData(data, centroId);
  }
}
