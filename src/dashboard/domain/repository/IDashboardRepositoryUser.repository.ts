import { AtualizarDashBoardUserZodDto } from 'src/dashboard/dtos/atualizarDashBoardUser.dto';
import { DashUserEntity } from '../entities/dashUser.entity';

export interface IDashboardRepositoryUser {
  atualizarDashBoardUser(dashUser: DashUserEntity): Promise<void>;
  buscarProdutibidadeAtualUser(
    params: AtualizarDashBoardUserZodDto,
  ): Promise<DashUserEntity | null>;
}
