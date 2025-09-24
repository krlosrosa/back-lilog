import { Inject } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';

export class DeletarDemandaUseCase {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number) {
    await this.demandaRepository.deletarDemanda(demandaId);
  }
}
