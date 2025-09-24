import { Inject, Injectable } from '@nestjs/common';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';

@Injectable()
export class DeletarCentroUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}
  async execute(centerId: string): Promise<boolean> {
    return this.centerRepository.delete(centerId);
  }
}
