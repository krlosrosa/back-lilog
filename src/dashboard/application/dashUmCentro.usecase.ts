import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';
import { DashUmCentrosZodDto } from '../dtos/dashUmCentro.dto';

@Injectable()
export class DashUmCentroUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    dataInicio: string,
    dataFim: string,
    centerId: string,
    processo: string,
  ): Promise<DashUmCentrosZodDto> {
    return this.dashboardRepository.dashIndividualCentro(
      dataInicio,
      dataFim,
      centerId,
      processo,
    );
  }
}
