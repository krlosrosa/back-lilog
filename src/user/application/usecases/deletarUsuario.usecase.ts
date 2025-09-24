import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';

@Injectable()
export class DeletarUsuarioUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(userId: string, centerId: string): Promise<void> {
    await this.userRepository.deletarUsuario(userId, centerId);
  }
}
