import { Inject } from '@nestjs/common';
import { type IDevolucaoTransportadorasRepository } from '../domain/repository/ITransportadoras.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddNovaTransportadora {
  constructor(
    @Inject('IDevolucaoTransportadorasRepository')
    private readonly devolucaoTransportadorasRepository: IDevolucaoTransportadorasRepository,
  ) {}

  async execute(nome: string, centerId: string): Promise<string> {
    const devolucaoTransportadora =
      await this.devolucaoTransportadorasRepository.create(nome, centerId);
    return devolucaoTransportadora.toString();
  }
}
