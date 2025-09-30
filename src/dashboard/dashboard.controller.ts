import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { DashCentrosUsecase } from './application/dashCentros.usecase';
import { DashCentrosZodDto } from './dtos/dashCentros.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiCommonErrors } from 'src/_shared/decorators/returnSwagger';
import { AuthGuard } from 'src/_shared/auth/auth.guard';

// @UseGuards(AuthGuard)
@ApiTags('Dashboard')
// @ApiBearerAuth('access-token')
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject(DashCentrosUsecase)
    private readonly dashCentrosUsecase: DashCentrosUsecase,
  ) {}

  @ApiOperation({
    summary: 'Dashboard de centros',
    operationId: 'dashCentros',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard de centros',
    type: DashCentrosZodDto,
  })
  @ApiCommonErrors()
  @Get('dash-centros')
  async dashCentros(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): Promise<DashCentrosZodDto> {
    return this.dashCentrosUsecase.execute(dataInicio, dataFim);
  }
}
