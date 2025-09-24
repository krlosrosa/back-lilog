import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteRepository } from '../domain/repositories/ITransporte.repository';

@Injectable()
export class AdicionarTransporteUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(
    command: TransportInfo[],
    centerId: string,
    dataExpedicao: Date,
    accountId: string,
  ): Promise<string> {
    const transportes = command.map((transport) => {
      return {
        dataExpedicao: dataExpedicao,
        nomeRota: transport.nomeRota ?? '',
        nomeTransportadora: transport.nomeTransportadora ?? '',
        numeroTransporte: transport.numeroTransporte,
        placa: transport.placa ?? '',
        centerId: centerId,
        cadastradoPorId: accountId,
        prioridade: transport.prioridade,
        obs: transport.obs,
      };
    });
    await this.transporteRepository.adicionarTransporte(transportes);
    return 'Transporte adicionado com sucesso';
  }
}

export type TransportInfo = {
  numeroTransporte: string;
  nomeRota?: string;
  nomeTransportadora?: string;
  placa?: string;
  prioridade?: number;
  obs?: string;
};
