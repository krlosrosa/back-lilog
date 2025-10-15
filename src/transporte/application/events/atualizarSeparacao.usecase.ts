import { Inject, Injectable } from '@nestjs/common';
import {
  PaleteComInfoTransporte,
  type ITransporteRepository,
} from 'src/transporte/domain/repositories/ITransporte.repository';

@Injectable()
export class AtualizarSeparacaoUsecase {
  constructor(
    @Inject('ITransporteRepository')
    private readonly transporteRepository: ITransporteRepository,
  ) {}

  async execute(demandaId: number): Promise<void> {
    const demandas =
      await this.transporteRepository.listarTransportesDeUmaDemanda(
        demandaId,
        'SEPARACAO',
      );
    const paletes =
      await this.transporteRepository.buscarPaletesPorTransportes(demandas);

    const paletesAgrupados = agruparPorTransporte(paletes);

    for (const [transporteId, paletesDoTransporte] of Object.entries(
      paletesAgrupados,
    )) {
      const transporteFinalizado = paletesDoTransporte.every((palete) => {
        return palete.paleteStatus === 'CONCLUIDO';
      });
      if (transporteFinalizado) {
        if (paletesDoTransporte[0].separacaoStatus === 'CONCLUIDO') return;
        return this.transporteRepository.atualizarTransporteSeparacao(
          transporteId,
          'CONCLUIDO',
        );
      } else {
        return this.transporteRepository.atualizarTransporteSeparacao(
          transporteId,
          'EM_PROGRESSO',
        );
      }
    }
  }
}

function agruparPorTransporte(
  array: PaleteComInfoTransporte[],
): Record<string, PaleteComInfoTransporte[]> {
  return array.reduce((acc, obj) => {
    const valor = obj['transporteId'];
    if (!acc[valor]) {
      acc[valor] = [];
    }
    acc[valor].push(obj);
    return acc;
  }, {});
}
