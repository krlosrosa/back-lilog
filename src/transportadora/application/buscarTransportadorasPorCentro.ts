import { Inject } from '@nestjs/common';
import { type IDevolucaoTransportadorasRepository } from '../domain/repository/ITransportadoras.repository';
import { Injectable } from '@nestjs/common';
import { ResponseTransportadoraDto } from '../dto/responseTransportadora.dto';

@Injectable()
export class BuscarTransportadorasPorCentro {
  constructor(
    @Inject('IDevolucaoTransportadorasRepository')
    private readonly devolucaoTransportadorasRepository: IDevolucaoTransportadorasRepository,
  ) {}

  async execute(centerId: string): Promise<ResponseTransportadoraDto> {
    const devolucaoTransportadora =
      await this.devolucaoTransportadorasRepository.findAllByCenter(centerId);
    return devolucaoTransportadora;
  }
}
