import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { CriarNovoFuncionarioZodDto } from 'src/user/dto/criarNovoFuncionario.dto';

@Injectable()
export class CriarNovoFuncionarioUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: CriarNovoFuncionarioZodDto) {
    return this.userRepository.criarNovoFuncionario(command);
  }
}
