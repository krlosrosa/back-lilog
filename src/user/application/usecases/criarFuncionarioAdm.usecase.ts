import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { CriarFuncionarioAdmZodDto } from 'src/user/dto/criarFuncionarioAdm.dto';
import { type IIdentityUserRepository } from 'src/user/domain/repositories/IIdentityUser.repository';
import { CriarNovoFuncionarioZodDto } from 'src/user/dto/criarNovoFuncionario.dto';

@Injectable()
export class CriarFuncionarioAdmUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IIdentityUserRepository')
    private readonly identityUserRepository: IIdentityUserRepository,
  ) {}
  async execute(
    command: CriarFuncionarioAdmZodDto,
    accessToken: string,
  ): Promise<CriarNovoFuncionarioZodDto> {
    const funcionario = await this.userRepository.criarFuncionarioAdm(command);
    console.log(funcionario);
    await this.identityUserRepository.addUser(command, accessToken);
    return funcionario;
  }
}
