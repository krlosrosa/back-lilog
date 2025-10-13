import { Inject, Injectable } from '@nestjs/common';
import { ContabilByIdResponseZodDto } from '../../devolucao/demanda/dtos/contabilByIdResponseZod.dto';
import { type IPwaRepository } from '../domain/repository/IPwa.repository';

@Injectable()
export class GetContabilByIdUsecase {
  constructor(
    @Inject('IPwaRepository')
    private readonly pwaRepository: IPwaRepository,
  ) {}

  async execute(demandaId: number): Promise<ContabilByIdResponseZodDto | null> {
    const demanda = await this.pwaRepository.getContabilById(demandaId);
    return demanda ?? null;
  }
}
