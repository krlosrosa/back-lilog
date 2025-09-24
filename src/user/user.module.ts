import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CriarNovoFuncionarioUsecase } from './application/usecases/criarNovoFuncionario.usecase';
import { MinhaInfoUsecase } from './application/usecases/minhaInfo.usecase';
import { CriarFuncionariosEmMassaUsecase } from './application/usecases/criarFuncionariosEmMassa.usecase';
import { DeletarUsuarioUsecase } from './application/usecases/deletarUsuario.usecase';
import { AtribuirCentroAFuncionarioUsecase } from './application/usecases/atribuirCentroAFuncionario.usecase';
import { UserPrismaRepository } from './infra/prisma/user-prisma.repository';
import { ListarFuncionariosPorCentroUsecase } from './application/usecases/listarFuncionariosPorCentro.usecase';
import { UserResolver } from './user.resolver';
import { ListarPermissoesCaslUsecase } from './application/usecases/listarPermissoesCasl.usecase';
import { CriarFuncionarioAdmUsecase } from './application/usecases/criarFuncionarioAdm.usecase';
import { KeycloakService } from './services/keycloak';
import { RemoverFuncionarioCentroUsecase } from './application/usecases/removerFuncionarioCentro.usecase';
import { ListarFuncionariosAdmPorCentroUsecase } from './application/usecases/listarFuncionariosAdmPorCentro.usecase';
import { ResetSenhaUsecase } from './application/usecases/resetSenha.usecase';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CriarNovoFuncionarioUsecase,
    MinhaInfoUsecase,
    CriarFuncionariosEmMassaUsecase,
    DeletarUsuarioUsecase,
    AtribuirCentroAFuncionarioUsecase,
    ListarFuncionariosPorCentroUsecase,
    ListarPermissoesCaslUsecase,
    CriarFuncionarioAdmUsecase,
    RemoverFuncionarioCentroUsecase,
    ListarFuncionariosAdmPorCentroUsecase,
    ResetSenhaUsecase,
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'IIdentityUserRepository',
      useClass: KeycloakService,
    },
    UserResolver,
  ],
})
export class UserModule {}
