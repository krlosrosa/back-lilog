import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';

@Injectable()
export class DeletarUsuarioUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(userId: string, centerId: string): Promise<void> {
    const functionario = await this.userRepository.listarPermissoesParaCasl(
      userId,
      centerId,
    );
    const hasMaster = functionario.filter((item) => item.role === 'MASTER');
    if (hasMaster.length > 0) {
      throw new BadRequestException(
        `Você não tem permissão para deletar um funcionário.`,
      );
    }
    await this.userRepository.deletarUsuario(userId, centerId);
  }
}
