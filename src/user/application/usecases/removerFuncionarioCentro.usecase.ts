import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';

@Injectable()
export class RemoverFuncionarioCentroUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(userId: string, centerId: string): Promise<string> {
    await this.userRepository.removerFuncionarioDoCentro(userId, centerId);
    return Promise.resolve('Centro removido com sucesso');
  }
}
