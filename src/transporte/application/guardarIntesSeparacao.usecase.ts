import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteCacheRepository } from '../domain/repositories/ITransporteCache.repository';

@Injectable()
export class GuardarIntesSeparacaoUsecase {
  constructor(
    @Inject('ITransporteCacheRepository')
    private readonly transporteCacheRepository: ITransporteCacheRepository,
  ) {}

  async execute(inte: { key: string; value: string }[]) {
    await this.transporteCacheRepository.adicionarIntesSeparacao(inte);
  }
}
