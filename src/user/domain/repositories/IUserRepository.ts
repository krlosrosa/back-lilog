import { DemandaEntity } from 'src/produtividade/domain/entities/demanda.entity';
import { UserEntity } from '../entities/user.entity';
import { ResponseInfoMeZodDto } from 'src/user/dto/responseInfoMe';
import { ListarFuncionariosPorCentroZodDto } from 'src/user/dto/user';
import { CriarNovoFuncionarioZodDto } from 'src/user/dto/criarNovoFuncionario.dto';
import { CriarFuncionariosEmMassaZodDto } from 'src/user/dto/criarFuncionariosEmMassa.dto';
import { ListarPermissionsZodDto } from 'src/user/dto/listarPermissions.dto';
import { CriarFuncionarioAdmZodDto } from 'src/user/dto/criarFuncionarioAdm.dto';
import { AtribuirCentroAFuncionarioZodDto } from 'src/user/dto/atribuirCentroAFuncionario.dto';

export interface IUserRepository {
  buscarPorId(id: string, centerId: string): Promise<UserEntity | null>;
  buscarPorIdEAssociadoADemanda(
    id: string,
    centerId: string,
  ): Promise<DemandaEntity | null>;
  getInfoMe(id: string): Promise<ResponseInfoMeZodDto>;
  listarFuncionariosPorCentro(
    centerId: string,
  ): Promise<ListarFuncionariosPorCentroZodDto>;
  listarFuncionariosAdmPorCentro(
    centerId: string,
  ): Promise<ListarFuncionariosPorCentroZodDto>;
  criarNovoFuncionario(
    command: CriarNovoFuncionarioZodDto,
  ): Promise<CriarNovoFuncionarioZodDto>;
  criarFuncionarioAdm(
    command: CriarFuncionarioAdmZodDto,
  ): Promise<CriarNovoFuncionarioZodDto>;
  deletarUsuario(userId: string, centerId: string): Promise<void>;
  criarFuncionariosEmMassa(
    params: CriarFuncionariosEmMassaZodDto,
  ): Promise<void>;
  listarPermissoesParaCasl(
    userId: string,
    centerId: string,
  ): Promise<ListarPermissionsZodDto[]>;
  atribuirCentroAFuncionario(
    command: AtribuirCentroAFuncionarioZodDto,
  ): Promise<void>;
  removerFuncionarioDoCentro(userId: string, centerId: string): Promise<void>;
}
