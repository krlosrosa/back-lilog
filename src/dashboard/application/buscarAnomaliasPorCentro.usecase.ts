import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';
import { AnomaliaPorCentroZodDto } from '../dtos/anomaliaPorCentro.dto';

@Injectable()
export class BuscarAnomaliaPorCentroUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    dataInicio: string,
    dataFim: string,
    centerId: string,
  ): Promise<AnomaliaPorCentroZodDto> {
    return this.dashboardRepository.buscarAnomaliaPorCentro(
      dataInicio,
      dataFim,
      centerId,
    );
  }
}
