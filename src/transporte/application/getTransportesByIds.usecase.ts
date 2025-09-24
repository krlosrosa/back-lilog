import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteRepository } from '../domain/repositories/ITransporte.repository';
import { TransporteResponseDto } from '../dto/transporte.dto';

@Injectable()
export class GetTransportesByIdsUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(ids: string[]): Promise<TransporteResponseDto[]> {
    const transportes =
      await this.transporteRepository.getTransportesByIds(ids);

    return transportes;
  }
}
