import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { CriarNovoFuncionarioZodDto } from 'src/user/dto/criarNovoFuncionario.dto';

@Injectable()
export class CriarNovoFuncionarioUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    command: CriarNovoFuncionarioZodDto,
  ): Promise<CriarNovoFuncionarioZodDto> {
    const user = await this.userRepository.buscarPorId(
      command.id,
      command.centerId,
    );
    if (user) {
      await this.userRepository.atribuirCentroAFuncionario({
        centerId: command.centerId,
        role: 'FUNCIONARIO',
        userId: command.id,
      });
      return {
        centerId: command.centerId,
        id: command.id,
        nome: command.nome,
        role: 'FUNCIONARIO',
        turno: command.turno,
        empresa: command.empresa,
      };
    }
    return this.userRepository.criarNovoFuncionario(command);
  }
}
