import { AtualizarDashBoardCentroZodDto } from 'src/dashboard/dtos/atualizarDashBoard.dto';
import { DashCenterEntity } from '../entities/dashCenter.entity';
import { StatusPorTransporteZodDto } from 'src/dashboard/dtos/statusPorTransporte.dto';
import { DashCentrosZodDto } from 'src/dashboard/dtos/dashCentros.dto';
import { DashUmCentrosZodDto } from 'src/dashboard/dtos/dashUmCentro.dto';
import { AnomaliaPorCentroZodDto } from 'src/dashboard/dtos/anomaliaPorCentro.dto';
import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';

export interface IDashboardRepositoryCenter {
  atualizarDashBoardCentro(dashCenter: DashCenterEntity): Promise<void>;
  buscarProdutibidadeAtualCentro(
    params: AtualizarDashBoardCentroZodDto,
  ): Promise<DashCenterEntity | null>;
  statusPorTransporte(
    data: string,
    centerId: string,
  ): Promise<StatusPorTransporteZodDto>;
  dashCentros(dataInicio: string, dataFim: string): Promise<DashCentrosZodDto>;
  dashIndividualCentro(
    dataInicio: string,
    dataFim: string,
    centerId: string,
    processo: string,
  ): Promise<DashUmCentrosZodDto>;
  buscarAnomaliaPorCentro(
    dataInicio: string,
    dataFim: string,
    centerId: string,
  ): Promise<AnomaliaPorCentroZodDto>;
  dashDaniloProdutividade(
    dataInicio: string,
    dataFim: string,
    centerId: string,
  ): Promise<DemandaEntity[]>;
}
