import { Inject, Injectable } from '@nestjs/common';
import { type IPwaRepository } from '../domain/repository/IPwa.repository';
import { FinalizarDemandaDevolucaoZodDto } from '../dtos/finalizarDemandaDevolucao.dto';

@Injectable()
export class FinalizarDemandaUsecase {
  constructor(
    @Inject('IPwaRepository')
    private readonly pwaRepository: IPwaRepository,
  ) {}
  async execute(
    request: FinalizarDemandaDevolucaoZodDto,
    demandaId: string,
  ): Promise<void> {
    return this.pwaRepository.finalizarDemanda(demandaId, request);
  }
}
