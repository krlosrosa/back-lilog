import { Inject, Injectable } from '@nestjs/common';
import { type IDashboardRepositoryCenter } from '../domain/repository/IDashboardRepositoryCenter.repository';
import { DashDaniloPausaZodDto } from '../dtos/dashDaniloPausas.dto';

@Injectable()
export class DashDaniloPausasUsecase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepositoryCenter,
  ) {}

  async execute(
    dataInicio: string,
    dataFim: string,
    centro: string,
  ): Promise<DashDaniloPausaZodDto> {
    return this.dashboardRepository.dashDaniloPausas(
      dataInicio,
      dataFim,
      centro,
    );
  }
}
