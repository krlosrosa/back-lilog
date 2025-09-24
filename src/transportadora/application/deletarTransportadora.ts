import { Inject } from '@nestjs/common';
import { type IDevolucaoTransportadorasRepository } from '../domain/repository/ITransportadoras.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletarTransportadora {
  constructor(
    @Inject('IDevolucaoTransportadorasRepository')
    private readonly devolucaoTransportadorasRepository: IDevolucaoTransportadorasRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.devolucaoTransportadorasRepository.delete(id);
    return;
  }
}
