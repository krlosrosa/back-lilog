import { Inject, Injectable } from '@nestjs/common';
import { AddNovaTransportadora } from './application/addNovaTransportadora';
import { BuscarTransportadorasPorCentro } from './application/buscarTransportadorasPorCentro';
import { EditarTransportadora } from './application/editarTransportadora';
import { DeletarTransportadora } from './application/deletarTransportadora';
import { ResponseTransportadoraDto } from './dto/responseTransportadora.dto';

@Injectable()
export class TransportadoraService {
  constructor(
    @Inject(AddNovaTransportadora)
    private readonly addNovaTransportadoraUsecase: AddNovaTransportadora,
    @Inject(BuscarTransportadorasPorCentro)
    private readonly buscarTransportadorasPorCentroUsecase: BuscarTransportadorasPorCentro,
    @Inject(EditarTransportadora)
    private readonly editarTransportadoraUsecase: EditarTransportadora,
    @Inject(DeletarTransportadora)
    private readonly deletarTransportadoraUsecase: DeletarTransportadora,
  ) {}

  addNovaTransportadora(nome: string, centerId: string): Promise<string> {
    return this.addNovaTransportadoraUsecase.execute(nome, centerId);
  }

  buscarTransportadorasPorCentro(
    centerId: string,
  ): Promise<ResponseTransportadoraDto> {
    return this.buscarTransportadorasPorCentroUsecase.execute(centerId);
  }

  editarTransportadora(id: number, nome: string): Promise<void> {
    return this.editarTransportadoraUsecase.execute(id, nome);
  }

  deletarTransportadora(id: number): Promise<void> {
    return this.deletarTransportadoraUsecase.execute(id);
  }
}
