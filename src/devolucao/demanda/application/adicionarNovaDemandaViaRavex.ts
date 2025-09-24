import { Inject, Injectable } from '@nestjs/common';
import { ReturnInfoGeralRavex } from '../dtos/ravex/returnInfoGeralRavex';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';

@Injectable()
export class AdicionarNovaDemandaViaRavex {
  constructor(
    @Inject('IDemandaRepository')
    private readonly devolucaoRepository: IDemandaRepository,
  ) {}

  async execute(
    demanda: ReturnInfoGeralRavex,
    centerId: string,
    adicionadoPorId: string,
  ): Promise<number> {
    const demandaId = await this.devolucaoRepository.addDemandaViaRavex(
      demanda,
      centerId,
      adicionadoPorId,
    );
    return demandaId;
  }
}
