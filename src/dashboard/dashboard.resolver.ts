import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  InputTransporteModel,
  OutputTransporteModel,
} from './model/StatusPorTransporteModel';
import { StatusPorTransporteUsecase } from './application/statusPorTransporte.usecase';
import { Inject } from '@nestjs/common';

@Resolver()
export class DashboardResolver {
  constructor(
    @Inject(StatusPorTransporteUsecase)
    private readonly statusPorTransporteUsecase: StatusPorTransporteUsecase,
  ) {}

  @Query(() => OutputTransporteModel)
  async statusPorTransporte(
    @Args('statusPorTransporteCommand')
    statusPorTransporteCommand: InputTransporteModel,
  ): Promise<OutputTransporteModel> {
    return this.statusPorTransporteUsecase.execute(
      statusPorTransporteCommand.data,
      statusPorTransporteCommand.centerId,
    );
  }
}
