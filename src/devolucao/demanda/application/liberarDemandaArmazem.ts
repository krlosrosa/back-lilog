import { Inject, Injectable } from '@nestjs/common';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';

@Injectable()
export class LiberarDemandaArmazem {
  constructor(
    @Inject('IDemandaRepository')
    private readonly demandaRepository: IDemandaRepository,
  ) {}

  async execute(demandaId: number, responsavelId: string) {
    await this.demandaRepository.liberarDemandaArmazem(
      demandaId,
      responsavelId,
    );
  }
}
