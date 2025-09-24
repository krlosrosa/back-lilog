import { Inject, Injectable } from '@nestjs/common';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';
import { DefinirConfiguracaoImpressaoDto } from 'src/centro/dto/definirConfiguracaoCentro.dto';

@Injectable()
export class DefinirConfiguracaoImpressaoUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}
  async execute(
    command: DefinirConfiguracaoImpressaoDto,
    centerId: string,
    atribuidoPorId: string,
  ): Promise<boolean> {
    return this.centerRepository.definirConfiguracaoImpressao(
      command,
      centerId,
      atribuidoPorId,
    );
  }
}
