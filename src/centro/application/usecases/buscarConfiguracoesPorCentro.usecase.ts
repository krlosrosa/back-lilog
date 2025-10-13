import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DefinirConfiguracaoImpressaoDto } from 'src/centro/dto/definirConfiguracaoCentro.dto';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';

@Injectable()
export class BuscarConfiguracoesPorCentroUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}

  async execute(
    centerId: string,
  ): Promise<Omit<DefinirConfiguracaoImpressaoDto, 'id'>> {
    const configuracoes =
      await this.centerRepository.buscarConfiguracoesPorCentro(centerId);
    if (!configuracoes) {
      throw new NotFoundException('Configurações de impressão não encontradas');
    }
    return configuracoes;
  }
}
