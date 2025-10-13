import { Inject, Injectable } from '@nestjs/common';
import { type IIdentityUserRepository } from 'src/user/domain/repositories/IIdentityUser.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('IIdentityUserRepository')
    private readonly identityUserRepository: IIdentityUserRepository,
  ) {}
  async execute(id: string): Promise<void> {
    await this.identityUserRepository.logout(id);
  }
}
