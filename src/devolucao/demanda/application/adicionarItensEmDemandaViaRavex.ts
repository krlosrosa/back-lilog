import { Inject } from '@nestjs/common';
import { AddItensEmDemandaDto } from '../dtos/ravex/addItensEmDemanda.dto';
import { type IDemandaRepository } from '../domain/repositories/demanda.repository';

export class AdicionarItensEmDemandaViaRavex {
  constructor(
    @Inject('IDemandaRepository')
    private readonly devolucaoRepository: IDemandaRepository,
  ) {}

  async execute(
    demandaId: number,
    centerId: string,
    itens: AddItensEmDemandaDto,
    adicionadoPorId: string,
  ) {
    return this.devolucaoRepository.adicionarItensEmDemandaViaRavex(
      demandaId,
      centerId,
      adicionadoPorId,
      itens,
    );
  }
}
