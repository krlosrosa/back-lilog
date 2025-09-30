import { AtualizarDashBoardCentroZodDto } from 'src/dashboard/dtos/atualizarDashBoard.dto';
import { DashCenterEntity } from '../entities/dashCenter.entity';
import { StatusPorTransporteZodDto } from 'src/dashboard/dtos/statusPorTransporte.dto';
import { DashCentrosZodDto } from 'src/dashboard/dtos/dashCentros.dto';

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
}
