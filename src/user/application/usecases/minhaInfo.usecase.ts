import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { ResponseInfoMeZodDto } from 'src/user/dto/responseInfoMe';

@Injectable()
export class MinhaInfoUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(accountId: string): Promise<ResponseInfoMeZodDto> {
    return this.userRepository.getInfoMe(accountId);
  }
}
