import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteCacheRepository } from '../domain/repositories/ITransporteCache.repository';
import { ItensDoTransporteZodDto } from '../dto/itensDoTransporte.dtos';

@Injectable()
export class BuscarItensPorTransporteUsecase {
  constructor(
    @Inject('ITransporteCacheRepository')
    private readonly transporteRepository: ITransporteCacheRepository,
  ) {}

  async execute(transporteId: string): Promise<ItensDoTransporteZodDto> {
    const itens =
      await this.transporteRepository.buscarItensPorTransporte(transporteId);

    const itensParse: ItensDoTransporteZodDto = JSON.parse(itens);
    return itensParse;
  }
}

/**
 type ItensPorTransporte = {
   codItem: string;
   lote: string;
   descricao: string;
   quantidade: number;
 };
 
 */
