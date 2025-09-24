import { Inject, Injectable } from '@nestjs/common';
import { type ITransporteRepository } from '../domain/repositories/ITransporte.repository';

@Injectable()
export class ListarNaoCadastadosUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(ids: string[]): Promise<string[]> {
    const transportes = await this.transporteRepository.listarTransportes(ids);
    return ids.filter((item) => !transportes.includes(item));
  }
}
