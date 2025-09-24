import { Inject, Injectable } from '@nestjs/common';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';
import { CriarNovoCentroZodDto } from 'src/centro/dto/criarNovoCentro.schema';

@Injectable()
export class BuscarTodosOsCentrosUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}
  async execute(): Promise<CriarNovoCentroZodDto[]> {
    return this.centerRepository.findAll();
  }
}
