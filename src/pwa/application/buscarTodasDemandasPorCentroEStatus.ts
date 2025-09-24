import { Inject, Injectable } from '@nestjs/common';
import { type IPwaRepository } from '../domain/repository/IPwa.repository';
import { ListaDemandasZodDto } from '../dtos/listaDemandas.dto';

@Injectable()
export class BuscarTodasDemandasPorCentroEStatusUsecase {
  constructor(
    @Inject('IPwaRepository')
    private readonly pwaRepository: IPwaRepository,
  ) {}

  async execute(
    centerId: string,
    conferenteId: string,
  ): Promise<ListaDemandasZodDto> {
    return await this.pwaRepository.buscarTodasDemandasPorCentroEStatus(
      centerId,
      conferenteId,
    );
  }
}
