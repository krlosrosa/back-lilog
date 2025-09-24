import { Inject, Injectable } from '@nestjs/common';
import { type IIdentityUserRepository } from 'src/user/domain/repositories/IIdentityUser.repository';

@Injectable()
export class ResetSenhaUsecase {
  constructor(
    @Inject('IIdentityUserRepository')
    private readonly identityUserRepository: IIdentityUserRepository,
  ) {}
  async execute(
    userId: string,
    newPassword: string,
    accessToken: string,
  ): Promise<void> {
    await this.identityUserRepository.resetPassword(
      userId,
      newPassword,
      accessToken,
    );
  }
}
