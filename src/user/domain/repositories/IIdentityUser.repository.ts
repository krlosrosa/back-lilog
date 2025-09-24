import { CriarFuncionarioAdmZodDto } from 'src/user/dto/criarFuncionarioAdm.dto';

export interface IIdentityUserRepository {
  addUser(
    command: CriarFuncionarioAdmZodDto,
    accessToken: string,
  ): Promise<string>;
  resetPassword(
    userId: string,
    newPassword: string,
    accessToken: string,
  ): Promise<void>;
}
