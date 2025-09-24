import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteRepository } from '../domain/repositories/ITransporte.repository';
import { TransporteResponseDto } from '../dto/transporte.dto';

@Injectable()
export class BuscarTransportePorDataUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(
    data: string,
    centerId: string,
  ): Promise<TransporteResponseDto[]> {
    const transportes = await this.transporteRepository.buscarTransportePorData(
      data,
      centerId,
    );

    return transportes;
  }
}
