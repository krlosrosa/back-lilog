import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';
import { DashCentrosZodDto } from '../dtos/dashCentros.dto';

@Injectable()
export class DashCentrosUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    dataInicio: string,
    dataFim: string,
  ): Promise<DashCentrosZodDto> {
    return this.dashboardRepository.dashCentros(dataInicio, dataFim);
  }
}
