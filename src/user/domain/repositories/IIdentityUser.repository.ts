import { CriarFuncionarioAdmZodDto } from 'src/user/dto/criarFuncionarioAdm.dto';

export interface IIdentityUserRepository {
  addUser(command: CriarFuncionarioAdmZodDto): Promise<string>;
  resetPassword(userId: string, newPassword: string): Promise<void>;
  logout(id: string): Promise<void>;
}
