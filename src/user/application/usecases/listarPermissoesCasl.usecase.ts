import { Inject } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { ListarPermissionsZodDto } from 'src/user/dto/listarPermissions.dto';

export class ListarPermissoesCaslUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    centerId: string,
  ): Promise<ListarPermissionsZodDto[]> {
    return this.userRepository.listarPermissoesParaCasl(userId, centerId);
  }
}
