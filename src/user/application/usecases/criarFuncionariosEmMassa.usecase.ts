import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { CriarFuncionariosEmMassaZodDto } from 'src/user/dto/criarFuncionariosEmMassa.dto';

@Injectable()
export class CriarFuncionariosEmMassaUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(params: CriarFuncionariosEmMassaZodDto) {
    await this.userRepository.criarFuncionariosEmMassa(params);
    return 'Funcionarios criados com sucesso';
  }
}
