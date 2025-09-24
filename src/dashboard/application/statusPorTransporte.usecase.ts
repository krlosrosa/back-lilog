import { Inject, Injectable } from '@nestjs/common';
import { StatusPorTransporteZodDto } from 'src/dashboard/dtos/statusPorTransporte.dto';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';

@Injectable()
export class StatusPorTransporteUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    data: string,
    centerId: string,
  ): Promise<StatusPorTransporteZodDto> {
    return this.dashboardRepository.statusPorTransporte(data, centerId);
  }
}
