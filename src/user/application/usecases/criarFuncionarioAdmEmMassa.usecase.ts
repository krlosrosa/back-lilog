import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from 'src/user/domain/repositories/IUserRepository';
import { type IIdentityUserRepository } from 'src/user/domain/repositories/IIdentityUser.repository';
import { CriarFuncionarioAdmEmMassaZodDto } from 'src/user/dto/criarFuncionarioAdmEmMassa.dto';

@Injectable()
export class CriarFuncionarioAdmEmMassaUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IIdentityUserRepository')
    private readonly identityUserRepository: IIdentityUserRepository,
  ) {}
  async execute(
    centerId: string,
    processo: string,
    senha: string,
    command: CriarFuncionarioAdmEmMassaZodDto,
  ): Promise<void> {
    const ids = command.map((id) => id.id);
    const userCadastrados =
      await this.userRepository.buscarFuncionarioEmMassaCadastradoPorIds(ids);
    const users = await this.userRepository.buscarFuncionarioEmMassaPorIds(
      ids,
      processo,
      centerId,
    );
    const jaNoProcesso = command.filter(
      (adm) => !users?.some((item) => item.id === adm.id),
    );

    const semCadastroKeyCloak = jaNoProcesso.filter(
      (adm) => !userCadastrados?.some((item) => item.id === adm.id),
    );

    const comCadastroKeyCloak = jaNoProcesso.filter((adm) =>
      userCadastrados?.some((item) => item.id === adm.id),
    );

    await Promise.all(
      semCadastroKeyCloak.map(async (cadastrar) => {
        await this.userRepository.criarFuncionarioAdm({
          centerId,
          processo,
          credencial: senha,
          id: cadastrar.id,
          nome: cadastrar.nome,
          primeiroNome: cadastrar.primeiroNome,
          turno: cadastrar.turno,
          ultimoNome: cadastrar.ultimoNome,
          empresa: cadastrar.empresa,
        });
        await this.identityUserRepository.addUser({
          centerId,
          processo,
          credencial: senha,
          id: cadastrar.id,
          nome: cadastrar.nome,
          primeiroNome: cadastrar.primeiroNome,
          turno: cadastrar.turno,
          ultimoNome: cadastrar.ultimoNome,
          empresa: cadastrar.empresa,
        });
      }),
    );

    await Promise.all(
      comCadastroKeyCloak.map(async (cadastro) => {
        await this.userRepository.atribuirCentroAFuncionario({
          centerId: centerId,
          role: 'USER',
          userId: cadastro.id,
          processo,
        });
      }),
    );
  }
}
