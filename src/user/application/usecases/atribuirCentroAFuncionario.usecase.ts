import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { AtribuirCentroAFuncionarioZodDto } from 'src/user/dto/atribuirCentroAFuncionario.dto';

@Injectable()
export class AtribuirCentroAFuncionarioUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: AtribuirCentroAFuncionarioZodDto): Promise<string> {
    await this.userRepository.atribuirCentroAFuncionario(command);
    return Promise.resolve('Centro atribuido com sucesso');
  }
}
