import { Inject } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';

export class FinalizarDemandaUseCase {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number, responsavelId: string) {
    await this.demandaRepository.finalizarDemanda(demandaId, responsavelId);
  }
}
