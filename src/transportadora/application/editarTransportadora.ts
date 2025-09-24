import { Inject } from '@nestjs/common';
import { type IDevolucaoTransportadorasRepository } from '../domain/repository/ITransportadoras.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditarTransportadora {
  constructor(
    @Inject('IDevolucaoTransportadorasRepository')
    private readonly devolucaoTransportadorasRepository: IDevolucaoTransportadorasRepository,
  ) {}

  async execute(id: number, nome: string): Promise<void> {
    await this.devolucaoTransportadorasRepository.edit(id, nome);
    return;
  }
}
