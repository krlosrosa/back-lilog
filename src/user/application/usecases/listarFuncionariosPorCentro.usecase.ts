import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { ListarFuncionariosPorCentroZodDto } from 'src/user/dto/user';

@Injectable()
export class ListarFuncionariosPorCentroUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(centerId: string): Promise<ListarFuncionariosPorCentroZodDto> {
    return this.userRepository.listarFuncionariosPorCentro(centerId);
  }
}
