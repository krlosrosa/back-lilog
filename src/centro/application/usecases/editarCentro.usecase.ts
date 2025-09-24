import { Inject, Injectable } from '@nestjs/common';
import { type ICenterRepository } from 'src/centro/domain/repositories/center.respository';

@Injectable()
export class EditarCentroUsecase {
  constructor(
    @Inject('ICenterRepository')
    private readonly centerRepository: ICenterRepository,
  ) {}
  async execute(centerId: string, command: EditarCentroDto): Promise<boolean> {
    const center = await this.centerRepository.edit(command, centerId);
    return center;
  }
}

export class EditarCentroDto {
  description: string;
  state: string;
  cluster: string;
}
