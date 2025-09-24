import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteRepository } from '../domain/repositories/ITransporte.repository';

@Injectable()
export class ListarTransportesComDemandaIniciada {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(ids: string[]): Promise<string[]> {
    return this.transporteRepository.listarTransportesComDemandaIniciada(ids);
  }
}
