import { Inject, Injectable } from '@nestjs/common';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';
import { CriarNovoCentroZodDto } from 'src/centro/dto/criarNovoCentro.schema';

@Injectable()
export class CriarNovoCentroUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}
  async execute(
    command: CriarNovoCentroZodDto,
  ): Promise<CriarNovoCentroZodDto> {
    return this.centerRepository.create(command);
  }
}
