import { Inject, Injectable } from '@nestjs/common';
import { CriarNovoFuncionarioUsecase } from './application/usecases/criarNovoFuncionario.usecase';
import { MinhaInfoUsecase } from './application/usecases/minhaInfo.usecase';
import { CriarFuncionariosEmMassaUsecase } from './application/usecases/criarFuncionariosEmMassa.usecase';
import { DeletarUsuarioUsecase } from './application/usecases/deletarUsuario.usecase';
import { AtribuirCentroAFuncionarioUsecase } from './application/usecases/atribuirCentroAFuncionario.usecase';
import { ResponseInfoMeZodDto } from './dto/responseInfoMe';
import { ListarFuncionariosPorCentroUsecase } from './application/usecases/listarFuncionariosPorCentro.usecase';
import { CriarNovoFuncionarioZodDto } from './dto/criarNovoFuncionario.dto';
import { CriarFuncionariosEmMassaZodDto } from './dto/criarFuncionariosEmMassa.dto';
import { ListarPermissoesCaslUsecase } from './application/usecases/listarPermissoesCasl.usecase';
import { CriarFuncionarioAdmZodDto } from './dto/criarFuncionarioAdm.dto';
import { CriarFuncionarioAdmUsecase } from './application/usecases/criarFuncionarioAdm.usecase';
import { RemoverFuncionarioCentroUsecase } from './application/usecases/removerFuncionarioCentro.usecase';
import { AtribuirCentroAFuncionarioZodDto } from './dto/atribuirCentroAFuncionario.dto';
import { ListarFuncionariosAdmPorCentroUsecase } from './application/usecases/listarFuncionariosAdmPorCentro.usecase';
import { ResetSenhaUsecase } from './application/usecases/resetSenha.usecase';

@Injectable()
export class UserService {
  constructor(
    @Inject(CriarNovoFuncionarioUsecase)
    private readonly criarNovoFuncionarioUsecase: CriarNovoFuncionarioUsecase,
    @Inject(MinhaInfoUsecase)
    private readonly minhaInfoUsecase: MinhaInfoUsecase,
    @Inject(CriarFuncionariosEmMassaUsecase)
    private readonly criarFuncionariosEmMassaUsecase: CriarFuncionariosEmMassaUsecase,
    @Inject(DeletarUsuarioUsecase)
    private readonly deletarUsuarioUsecase: DeletarUsuarioUsecase,
    @Inject(AtribuirCentroAFuncionarioUsecase)
    private readonly atribuirCentroAFuncionarioUsecase: AtribuirCentroAFuncionarioUsecase,
    @Inject(ListarFuncionariosPorCentroUsecase)
    private readonly listarFuncionariosPorCentroUsecase: ListarFuncionariosPorCentroUsecase,
    @Inject(ListarPermissoesCaslUsecase)
    private readonly listarPermissoesCaslUsecase: ListarPermissoesCaslUsecase,
    @Inject(CriarFuncionarioAdmUsecase)
    private readonly criarFuncionarioAdmUsecase: CriarFuncionarioAdmUsecase,
    @Inject(RemoverFuncionarioCentroUsecase)
    private readonly removerFuncionarioDoCentroUsecase: RemoverFuncionarioCentroUsecase,
    @Inject(ListarFuncionariosAdmPorCentroUsecase)
    private readonly listarFuncionariosAdmPorCentroUsecase: ListarFuncionariosAdmPorCentroUsecase,
    @Inject(ResetSenhaUsecase)
    private readonly resetSenhaUsecase: ResetSenhaUsecase,
  ) {}

  criarNovoFuncionario(command: CriarNovoFuncionarioZodDto) {
    return this.criarNovoFuncionarioUsecase.execute(command);
  }

  minhaInfo(accountId: string): Promise<ResponseInfoMeZodDto> {
    return this.minhaInfoUsecase.execute(accountId);
  }

  criarFuncionariosEmMassa(params: CriarFuncionariosEmMassaZodDto) {
    return this.criarFuncionariosEmMassaUsecase.execute(params);
  }

  deletarUsuario(userId: string, centerId: string) {
    return this.deletarUsuarioUsecase.execute(userId, centerId);
  }

  atribuirCentroAFuncionario(command: AtribuirCentroAFuncionarioZodDto) {
    return this.atribuirCentroAFuncionarioUsecase.execute(command);
  }

  listarFuncionariosPorCentro(centerId: string) {
    return this.listarFuncionariosPorCentroUsecase.execute(centerId);
  }

  listarPermissoesParaCasl(userId: string, centerId: string) {
    return this.listarPermissoesCaslUsecase.execute(userId, centerId);
  }

  listarFuncionariosAdmPorCentro(centerId: string) {
    return this.listarFuncionariosAdmPorCentroUsecase.execute(centerId);
  }

  criarFuncionarioAdm(command: CriarFuncionarioAdmZodDto, accessToken: string) {
    return this.criarFuncionarioAdmUsecase.execute(command, accessToken);
  }

  removerFuncionarioDoCentro(userId: string, centerId: string) {
    return this.removerFuncionarioDoCentroUsecase.execute(userId, centerId);
  }

  resetSenha(userId: string, accessToken: string, newPassword: string) {
    return this.resetSenhaUsecase.execute(userId, newPassword, accessToken);
  }
}
