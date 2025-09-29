import { Injectable } from '@nestjs/common';
import { IIdentityUserRepository } from '../domain/repositories/IIdentityUser.repository';
import { CriarFuncionarioAdmZodDto } from '../dto/criarFuncionarioAdm.dto';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class KeycloakService implements IIdentityUserRepository {
  private kcAdminClient: KeycloakAdminClient;

  constructor() {}

  private async getClient(): Promise<any> {
    if (!this.kcAdminClient) {
      const { default: KcAdminClient } = await import(
        '@keycloak/keycloak-admin-client'
      );
      this.kcAdminClient = new KcAdminClient({
        baseUrl: process.env.KEYCLOAK_URL,
        realmName: process.env.REALM_NAME,
      });
    }
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: 'backend', // O Client ID que você criou
      clientSecret: process.env.CLIENT_SECRET_KEYCLOAK, // O Client Secret que você copiou
    });
    return this.kcAdminClient;
  }

  async addUser(
    user: CriarFuncionarioAdmZodDto,
    accessToken: string,
  ): Promise<string> {
    const kcAdminClient: KeycloakAdminClient = await this.getClient();
    console.log({ keycloakUser: user, accessToken });
    const userCreated = await kcAdminClient.users.create({
      username: user.id,
      enabled: true,
      firstName: user.primeiroNome,
      lastName: user.ultimoNome,
      credentials: [
        {
          type: 'password',
          value: user.credencial,
          temporary: true,
        },
      ],
    });
    console.log(userCreated);
    return userCreated.id;
  }

  async deleteUser(userId: string, accessToken: string): Promise<void> {
    const kcAdminClient = await this.getClient();
    await kcAdminClient.users.delete({
      id: userId,
    });
  }

  async resetPassword(
    userId: string,
    accessToken: string,
    newPassword: string,
  ): Promise<void> {
    const kcAdminClient: KeycloakAdminClient = await this.getClient();
    const users = await kcAdminClient.users.find({ username: userId });
    if (users.length === 0) {
      throw new Error('User not found');
    }
    console.log({ newPassword });
    const user = users[0];
    await kcAdminClient.users.resetPassword({
      id: user.id as string,
      credential: {
        type: 'password',
        value: newPassword,
        temporary: true,
      },
    });
  }
}
